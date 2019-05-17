import requests
import json
from bs4 import BeautifulSoup
from decimal import Decimal
from records import request_soup
from sabr.common import RECORDS_DIRECTORY, pick_dick
from datastore_json import read_json, write_json
from datastore_postgre import read_records, write_records

YEAR = 2019
TEAM_NUM = 6
LEAG_INITIAL_LIST = ['p', 'c']
TEAM_INITIAL_LIST = [
    'l', 'h', 'f', 'b', 'm', 'e', 'c', 's', 'g', 'db', 'd', 't'
]
TEAM_TR_LIST = [2, 4, 6, 8, 10, 12]

IBB_COLUMN_DICT = {'p': 18, 'b': 17}


def create_team_list():
    team_list = []
    for leag_initial in LEAG_INITIAL_LIST:
        url = f'http://npb.jp/bis/{str(YEAR)}/stats/std_{leag_initial}.html'
        soup = request_soup(url)
        table = soup.find('table')
        trs = table.find_all('tr')
        # trs [0]:full, [1]:header, [2,4,6...]:team [3,5,8..]:team_cell
        header_tds = trs[1].find_all('td')
        header = [
            header_td.text.replace('\u3000', '').replace('｜', 'ー')
            for header_td in header_tds[:-TEAM_NUM] if header_td.text
        ]
        for body_iter in TEAM_TR_LIST:
            body_tds = trs[body_iter].find_all('td')
            body = [
                body_td.text.replace('\u3000', '')
                for body_td in body_tds[2:-TEAM_NUM]  # rm team cell
            ]
            team_list.append(dict(zip(header, body)))
    return team_list


def write_team_records():
    team_list = create_team_list()

    write_json('teams.json', {'Team': team_list})
    # write_records('TEAMS', team_list)


def create_intentional_bb_dict(p_or_b):
    intentional_bb_dict = {}
    for team_initial in TEAM_INITIAL_LIST:
        url = f'http://npb.jp/bis/{str(YEAR)}/stats/id{p_or_b}1_{team_initial}.html'
        soup = request_soup(url)
        player_trs = soup.find_all('tr', class_='ststats')
        team_intentional_bb_dict = {
            pl_trs.find('td', class_='stplayer').text.replace('　', ' '):
            pl_trs.find_all('td')[IBB_COLUMN_DICT[p_or_b]].text
            for pl_trs in player_trs
        }
        intentional_bb_dict.update(team_intentional_bb_dict)
    return intentional_bb_dict


def regulation_at_bat(games, at_bat):
    if Decimal(at_bat) < Decimal(games) * Decimal('3.1'):
        return False
    else:
        return True


def regulation_innings(games, innings):
    if Decimal(innings) < Decimal(games):
        return False
    else:
        return True


def update_hitter_y_records(hitter_list, team_list):
    hitter_ibb_dict = create_intentional_bb_dict('b')

    for hitter in hitter_list:
        if not hitter['試合']:
            intentional_bb = '0'
            regulation_at_bat = False
        else:
            intentional_bb = hitter_ibb_dict.get(hitter['Name'], '0')
            team = pick_dick(team_list, 'チーム', hitter['Team'])
            regulation_at_bat = regulation_at_bat(team['試合'], hitter['打席'])
        hitter['規定'] = regulation_at_bat
        hitter['故意四球'] = intentional_bb

    return hitter_list


def update_pitcher_y_records(pitcher_list, team_list):
    pitcher_ibb_dict = create_intentional_bb_dict('p')

    for pitcher in pitcher_list:
        if not pitcher['登板']:
            intentional_bb = '0'
            reg_innings = False
        else:
            intentional_bb = pitcher_ibb_dict.get(pitcher['Name'], '0')
            team = pick_dick(team_list, 'チーム', pitcher['Team'])
            reg_innings = regulation_innings(team['試合'], pitcher['投球回'])
        pitcher['規定'] = reg_innings
        pitcher['故意四球'] = intentional_bb

    return pitcher_list


def update_records_by_official():
    pitcher_list = read_json('pitchers.json')['Pitcher']
    hitter_list = read_json('hitters.json')['Hitter']

    team_list = read_json('teams.json')['Team']

    pitcher_list = update_pitcher_y_records(pitcher_list, team_list)
    hitter_list = update_hitter_y_records(hitter_list, team_list)

    write_json('pitchers.json', {'Pitcher': pitcher_list})
    write_json('hitters.json', {'Hitter': hitter_list})
