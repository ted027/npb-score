import requests
import json
import time
from decimal import Decimal
from bs4 import BeautifulSoup
from common import unify_teams, RECORDS_DIRECTORY
from sabr.common import return_outcounts
from datastore_json import read_json, write_json

NAME_H1 = 1
TEAM_H1 = 0

TRAINING_NUM_DIGIT = 3

EXCEPT_TITLE = 1

PITCHER_DUMP_VAL = 1
HITTER_DUMP_VAL = 2

RL_PITCHER_VALUE = 2
RL_HITTER_VALUE = 4
# 被打数なし を判断しskipするため
RL_PITCHER_NOVALUE = 1

PITCH_TOO_SHORT_SECTIONS = 9
HIT_TOO_SHORT_SECTIONS = 9

TEAM_NUM_LIST = [376 if i == 10 else i for i in list(range(1, 13))]

CENTRAL_LIST = ['広島', '巨人', 'ヤクルト', 'ＤｅＮＡ', '中日', '阪神']
PACIFIC_LIST = ['西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天']

BASEURL = 'https://baseball.yahoo.co.jp'


def request_soup(url):
    while True:
        time.sleep(8)
        res = requests.get(url)
        if 200 <= res.status_code < 300 and res.content:
            break
        else:
            print(f'{res.status_code}: {res.url}')
            time.sleep(15)
    return BeautifulSoup(res.content, 'html.parser')


def link_tail_list(url):
    soup = request_soup(url)
    table = soup.find('table')
    td_player_list = table.find_all('td', class_='bb-playerTable__data--player')
    # 育成選手を除外するために背番号も取得
    td_number_list = table.find_all('td', class_='bb-playerTable__data--number')
    return [
        pl.find('a').get('href')
        for num, pl in zip(td_number_list, td_player_list)
        if len(num.text) < TRAINING_NUM_DIGIT
    ]


def full_val(str_val):
    if str_val == '-':
        return '0'
    return str_val.replace('\n', '')


def basic_information(personal_soup):
    # '現在JavaScriptが無効です。'があれば削除
    personal_soup.find('h1', class_='bb-jsOff__title').extract()
    h1s = personal_soup.find_all('h1')

    name = h1s[NAME_H1].text
    team = unify_teams(h1s[TEAM_H1].text)
    if team in CENTRAL_LIST:
        league = 'Central'
    elif team in PACIFIC_LIST:
        league = 'Pacific'
    else:
        raise BaseException('String of Team Name is invalid.')
    return {'Name': name, 'Team': team, 'League': league}


def confirm_pitcher_tables(sections):
    """
    return basic, right/left, park records
    """
    records_table = rl_table = park_table = None
    for section in sections:
        try:
            record_type = section.find('header').find('h1').text
        except BaseException:
            record_type = ''
        if record_type == '投手成績':
            records_table = section.find('table')
        elif record_type == '対左右別成績' and not rl_table:
            rl_table = section.find('table')
        elif record_type == '球場別成績' and not park_table:
            park_table = section.find('table')
    return records_table, rl_table, park_table


def confirm_hitter_tables(sections):
    """
    return basic, chance, right/left, count, runner, park records
    """
    records_table = chance_table = rl_table = count_table = runner_table = park_table = None
    for section in sections:
        try:
            record_type = section.find('header').find('h1').text
        except BaseException:
            record_type = ''
        if record_type == '打者成績':
            records_table = section.find('table')
        elif record_type == '得点圏成績' and not chance_table:
            chance_table = section.find('table')
        elif record_type == '対左右別成績' and not rl_table:
            # 野手が登板した場合に打撃成績部分を取れるように
            headers = [header.text for header in section.find_all('th')]
            if '打率' in headers:
                rl_table = section.find('table')
        # elif record_type == 'カウント別成績' and not count_table:
        #     count_table = section.find('table')
        # elif record_type == '塁状況別成績' and not runner_table:
        #     runner_table = section.find('table')
        elif record_type == '球場別成績' and not park_table:
            # 野手が登板した場合に打撃成績部分を取れるように
            headers = [header.text for header in section.find_all('th')]
            if '打率' in headers:
                park_table = section.find('table')
    return records_table, chance_table, rl_table, count_table, runner_table, park_table


def dict_records(records_table):
    rheader = [th.text for th in records_table.find_all('th')]
    rbody = [full_val(td.text) for td in records_table.find_all('td')]
    dict(zip(rheader, rbody))
    return dict(zip(rheader, rbody))


def chance_records(chance_table):
    chheader_raw = [th.text for th in chance_table.find_all('th')]
    # '圏' + header値
    # [1:] remove table title
    chheader = ['圏' + h for h in chheader_raw]

    chbody = [full_val(td.text) for td in chance_table.find_all('td')]
    return dict(zip(chheader, chbody))


def records_by_rl(rl_table, dump_val):
    """
    dump_val: remove top contentof
            pitcher: 1 ('打者')
            hitter: 2 ('投手', '打席')
    """
    rl_header = [th.text for th in rl_table.find_all('th')][dump_val:]
    if len(rl_header) > 10:
        print(f'dump_val\n{dump_val}')
        print(f'rl_header\n{rl_header}')
        print(rl_table.find_all('th'))

    rl_trs = rl_table.find_all('tr')[EXCEPT_TITLE:]
    if len(rl_trs) == RL_PITCHER_VALUE:
        return _rl_pitcher(rl_trs, rl_header)
    elif len(rl_trs) == RL_HITTER_VALUE:
        return _rl_hitter(rl_trs, rl_header)


def _rl_pitcher(rl_trs, rl_header):
    rl_records = {}
    for rl_tr in rl_trs:
        rl_text = rl_tr.find('td').text
        rl_body = [full_val(td.text) for td in rl_tr.find_all('td')[-len(rl_header):]]
        if rl_body[RL_PITCHER_NOVALUE] == '0':
            continue
        if '右' in rl_text:
            rl_records['対右'] = dict(zip(rl_header, rl_body))
        elif '左' in rl_text:
            rl_records['対左'] = dict(zip(rl_header, rl_body))
    return rl_records


def _rl_hitter(rl_trs, rl_header):
    rl_records = {}
    for i in range(2):
        rl_text = rl_trs[i * 2].find('td').text
        # [-len(rl_header):] 打者のtr length違いに対応するため
        rl_body_right = [full_val(td.text) for td in rl_trs[i * 2].find_all('td')[-len(rl_header):]]
        rl_body_left = [full_val(td.text) for td in rl_trs[i * 2 + 1].find_all('td')[-len(rl_header):]]
        rl_body = [str(Decimal(right) + Decimal(left)) for right, left in zip(rl_body_right, rl_body_left)]
        if '右' in rl_text:
            rl_records['対右'] = dict(zip(rl_header, rl_body))
        elif '左' in rl_text:
            rl_records['対左'] = dict(zip(rl_header, rl_body))
    return rl_records


def records_by_count_runner_park(table_by):
    # [1:] remove header content 'カウント/ランナー/球場'
    header = [th.text.replace('|', 'ー')
              for th in table_by.find_all('th')][EXCEPT_TITLE:]

    # [2:] remove header row
    body_tr = table_by.find_all('tr')[EXCEPT_TITLE:]
    records_by_count_runner_park = {}
    for tr in body_tr:
        situation = tr.find('td').text
        body = [
            full_val(td.text) for td in tr.find_all('td')[EXCEPT_TITLE:]
        ]
        records_by_count_runner_park[situation] = dict(zip(header, body))
    return records_by_count_runner_park


def append_team_pitcher_array(link_tail_list):
    team_pitcher_list = []
    for ptail in link_tail_list:
        # personal id
        # personal_id = ptail.split('/')[-2]
        # personal_dict = {'id': personal_id}

        personal_link = BASEURL + ptail

        # retry if contents is too short
        while True:
            personal_soup = request_soup(personal_link)

            personal_dict = basic_information(personal_soup)

            sections = personal_soup.find_all('section')
            records_table, rl_table, park_table = confirm_pitcher_tables(sections)

            records = dict_records(records_table)

            # section length > 出場なしならbreak. 後半は保険
            if len(sections) > PITCH_TOO_SHORT_SECTIONS or not Decimal(records['登板']):
                break
            else:
                print(f'retry: {personal_link}')

        # skip after here if 登板なし
        if not Decimal(records['登板']):
            continue

        records['アウト'] = str(return_outcounts(Decimal(records['投球回'])))

        # UI表記のため 被本塁打 -> 被HR
        records['被HR'] = records['被本塁打']

        # QS 球場別から加算
        qs_value = Decimal('0')
        for value in records.get('球場', {}).values():
            qs_value += Decimal(value.get('QS', '0'))
        records['QS'] = str(qs_value)

        if rl_table:
            # 1: dump '○打者'
            records_rl = records_by_rl(rl_table, PITCHER_DUMP_VAL)
            records.update(records_rl)

        records['被打数'] = str(
            Decimal(records.get('対右', {}).get('被打数', '0')) +
            Decimal(records.get('対左', {}).get('被打数', '0')))

        if park_table:
            records_by_park = records_by_count_runner_park(park_table)
            records.update({'球場': records_by_park})

        personal_dict.update(records)

        team_pitcher_list.append(personal_dict)

    return team_pitcher_list


def append_team_hitter_array(link_tail_list):
    team_hitter_list = []
    for htail in link_tail_list:
        # personal id
        # personal_id = htail.split('/')[-2]
        # personal_dict = {'id': personal_id}

        personal_link = BASEURL + htail

        # retry if contents is too short
        while True:
            personal_soup = request_soup(personal_link)

            personal_dict = basic_information(personal_soup)

            sections = personal_soup.find_all('section')
            records_table, chance_table, rl_table, count_table, runner_table, park_table = confirm_hitter_tables(
            sections)

            records = dict_records(records_table)

            # section length > 出場なしならbreak. 後半は保険
            if len(sections) > HIT_TOO_SHORT_SECTIONS or not Decimal(records['試合']):
                break
            else:
                print(f'retry: {personal_link}')

        if not Decimal(records['試合']):
            continue

        del records['得点圏']

        if chance_table:
            ch_records = chance_records(chance_table)
            records.update(ch_records)

        if rl_table:
            # 2: dump '○投' | '○打者'
            records_rl = records_by_rl(rl_table, HITTER_DUMP_VAL)
            records.update(records_rl)

        if count_table:
            records_by_count = records_by_count_runner_park(count_table)
            records.update({'カウント': records_by_count})

        if runner_table:
            records_by_runner = records_by_count_runner_park(runner_table)
            records.update({'走者': records_by_runner})

        if park_table:
            records_by_park = records_by_count_runner_park(park_table)
            records.update({'球場': records_by_park})

        personal_dict.update(records)

        team_hitter_list.append(personal_dict)

    return team_hitter_list

def create_team_player_list(td_team_players, team, headers):
    team_player_list = []
    for td_player in td_team_players:
        # basic_information
        # records
        pass


def create_td_team_player_list(soup):
    table = soup.find('table')
    td_player_list = table.find_all('td', class_='bb-playerTable__data--player')
    # 育成選手を除外するために背番号も取得
    td_number_list = table.find_all('td', class_='bb-playerTable__data--number')
    return [
        # pl.find('a').get('href')
        td_pl
        for td_num, td_pl in zip(td_number_list, td_player_list)
        if len(td_num.text) < TRAINING_NUM_DIGIT
    ]


def extend_team_player_list(player_type):
    player_list = []
    # thから項目を作る
    # default_url = BASEURL + '/npb/teams/' + '1' + '/memberlist?kind=' + player_type
    headers = []
    for i in TEAM_NUM_LIST:

        url = BASEURL + '/npb/teams/' + str(i) + '/memberlist?kind=' + player_type

        ltail_list = link_tail_list(url)
        soup = request_soup(url)
        # get headers from th
        # if not headers:
        #     th_headers = [th for th in soup.find('thead').find_all('th')]
        #     headers_raw = [th_header.find('p').text if th_header.find('p') else th_header.text for th_header in th_headers]
        #     # 全角 -> 半角
        #     headers = [header.replace('\u3000', '').translate(str.maketrans({chr(0xFF01 + i): chr(0x21 + i) for i in range(94)})) for header in headers_raw]
        # # get team name from h1
        # team = unify_teams(soup.find('h1').text)
        
        # td_team_players = create_td_team_player_list(soup)

        # team_player_list = create_team_player_list(td_team_players, team, headers)

        if player_type == 'p':
            team_player_list = append_team_pitcher_array(ltail_list)
        elif player_type == 'b':
            team_player_list = append_team_hitter_array(ltail_list)
        else:
            raise BaseException('player type is invalid.')
        player_list.extend(team_player_list)

    return player_list


def write_pitcher_records():
    pitcher_list = extend_team_player_list('p')

    write_json('pitchers.json', {'Pitcher': pitcher_list})


def write_hitter_records():
    hitter_list = extend_team_player_list('b')

    write_json('hitters.json', {'Hitter': hitter_list})
