import requests
import json
import time
from decimal import Decimal
from bs4 import BeautifulSoup
from common import unify_teams
from sabr.common import return_outcounts
from datastore_json import write_json

TRAINING_NUM_DIGIT = 3

EXCEPT_TITLE = 1

TEAM_NUM_LIST = [376 if i == 10 else i for i in list(range(1, 13))]

CENTRAL_LIST = ['広島', '巨人', 'ヤクルト', 'ＤｅＮＡ', '中日', '阪神']
PACIFIC_LIST = ['西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天']

BASEURL = 'https://baseball.yahoo.co.jp'


def request_soup(url):
    while True:
        time.sleep(1)
        res = requests.get(url)
        if 200 <= res.status_code < 300 and res.content:
            break
        else:
            print(f'{res.status_code}: {res.url}')
            time.sleep(5)
    return BeautifulSoup(res.content, 'html.parser')


def full_val(str_val):
    if str_val == '-':
        return '0'
    return str_val.replace('\n', '')


def team_information(tr_player, team):
    if team in CENTRAL_LIST:
        league = 'Central'
    elif team in PACIFIC_LIST:
        league = 'Pacific'
    else:
        raise BaseException('Team Name is invalid.')
    return {'Team': team, 'League': league}


def records(tr_player):
    records_raw = [td.text if td.text else td.find('a').text for td in tr_player.find_all('td')]
    return [full_val(record.replace('\n', '')) for record in records_raw]


def create_team_player_list(tr_team_players, team, headers):
    team_player_list = []
    for tr_player in tr_team_players:
        # team_information
        personal_dict = team_information(tr_player, team)
        
        # records
        personal_record_values = records(tr_player)
        personal_records = dict(zip(headers, personal_record_values))
        personal_dict.update(personal_records)

        # 2019とのUI共通互換性 Name <- 選手名
        personal_dict['Name'] = personal_dict['選手名']
        del personal_dict['選手名']

        # '得点圏' -> '圏打率'
        if personal_dict.get('得点圏', ''):
            personal_dict['圏打率'] = personal_dict['得点圏']
            del personal_dict['得点圏']

        # add outcount if pitcher
        if personal_dict.get('投球回', ''):
            personal_dict['アウト'] = str(return_outcounts(Decimal(personal_dict['投球回'])))
        
        team_player_list.append(personal_dict)
    return team_player_list



def create_tr_team_player_list(soup):
    table = soup.find('table')
    tr_player_list = table.find_all('tr', class_='bb-playerTable__row')
    # 育成選手を除外するために背番号も取得
    td_number_list = table.find_all('td', class_='bb-playerTable__data--number')
    return [
        tr_pl
        for td_num, tr_pl in zip(td_number_list, tr_player_list)
        if len(td_num.text) < TRAINING_NUM_DIGIT
    ]


def all_player_list(player_type):
    player_list = []
    headers = []
    for i in TEAM_NUM_LIST:

        url = BASEURL + '/npb/teams/' + str(i) + '/memberlist?kind=' + player_type

        soup = request_soup(url)
        # get headers from th
        if not headers:
            th_headers = [th for th in soup.find('thead').find_all('th')]
            headers_raw = [th_header.find('p').text if th_header.find('p') else th_header.text for th_header in th_headers]
            # 全角 -> 半角
            headers = [header.replace('\u3000', '').translate(str.maketrans({chr(0xFF01 + i): chr(0x21 + i) for i in range(94)})) for header in headers_raw]
        # get team name from h1
        team = unify_teams(soup.find('h1').text)
        
        tr_team_players = create_tr_team_player_list(soup)[EXCEPT_TITLE:]

        team_player_list = create_team_player_list(tr_team_players, team, headers)

        player_list.extend(team_player_list)

    return player_list


def write_pitcher_records():
    pitcher_list = all_player_list('p')

    write_json('pitchers.json', {'Pitcher': pitcher_list})


def write_hitter_records():
    hitter_list = all_player_list('b')

    write_json('hitters.json', {'Hitter': hitter_list})
