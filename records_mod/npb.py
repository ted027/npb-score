import requests
import json
from bs4 import BeautifulSoup
from decimal import Decimal
from common import YEAR, TEAM_NUM, RECORDS_DIRECTORY, pick_dick, unify_teams, request_soup
from datastore_json import read_json, write_json
# from datastore_postgre import read_records, write_records

LEAG_INITIAL_DICT = {'p': 'Pacific', 'c': 'Central'}
TEAM_INITIAL_LIST = [
    'l', 'h', 'f', 'b', 'm', 'e', 'c', 's', 'g', 'db', 'd', 't'
]
TEAM_TR_LIST = [2, 4, 6, 8, 10, 12]

IBB_COLUMN_DICT = {'p': 18, 'b': 17}
HITTERS_COLUMN_DICT = {'p': 12}


def create_additional_dicts(p_or_b):
    intentional_bb_dict = {}
    hitters_dict = {}
    for team_initial in TEAM_INITIAL_LIST:
        url = f'http://npb.jp/bis/{str(YEAR)}/stats/id{p_or_b}1_{team_initial}.html'
        soup = request_soup(url, 1, 5)
        player_trs = soup.find_all('tr', class_='ststats')
        team_intentional_bb_dict = {
            pl_trs.find('td', class_='stplayer').text.replace('　', ' '):
            pl_trs.find_all('td')[IBB_COLUMN_DICT[p_or_b]].text
            for pl_trs in player_trs
        }
        intentional_bb_dict.update(team_intentional_bb_dict)
        if p_or_b == 'p':
            team_hitters_dict = {
                pl_trs.find('td', class_='stplayer').text.replace('　', ' '):
                pl_trs.find_all('td')[HITTERS_COLUMN_DICT[p_or_b]].text
                for pl_trs in player_trs
            }
            hitters_dict.update(team_hitters_dict)

    return intentional_bb_dict, hitters_dict


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
    hitter_ibb_dict, unuse = create_additional_dicts('b')

    for hitter in hitter_list:
        if not hitter['試合']:
            intentional_bb = '0'
            reg_at_bat = False
        else:
            intentional_bb = hitter_ibb_dict.get(hitter['Name'], '0')
            team = pick_dick(team_list, 'チーム', hitter['Team'])
            reg_at_bat = regulation_at_bat(team['試合'], hitter['打席'])
        hitter['規定'] = reg_at_bat
        hitter['故意四球'] = intentional_bb

    return hitter_list


def update_pitcher_y_records(pitcher_list, team_list):
    pitcher_ibb_dict, hitters_dict = create_additional_dicts('p')

    for pitcher in pitcher_list:
        if not pitcher['登板']:
            intentional_bb = '0'
            hitters = '0'
            reg_innings = False
        else:
            intentional_bb = pitcher_ibb_dict.get(pitcher['Name'], '0')
            hitters = hitters_dict.get(pitcher['Name'], '0')
            team = pick_dick(team_list, 'チーム', pitcher['Team'])
            reg_innings = regulation_innings(team['試合'], pitcher['投球回'])
        pitcher['規定'] = reg_innings
        pitcher['故意四球'] = intentional_bb
        pitcher['打者'] = hitters

        # 打数を仮で出す 犠打、犠飛は取得できないため無視
        pitcher['被打数'] = str(Decimal(pitcher['打者']) - Decimal(pitcher['与四球']) - Decimal(pitcher['与死球']))

    return pitcher_list


def update_records_by_official():
    pitcher_list = read_json('pitchers.json')['Pitcher']
    hitter_list = read_json('hitters.json')['Hitter']

    team_list = read_json('teams.json')['Team']

    pitcher_list = update_pitcher_y_records(pitcher_list, team_list)
    hitter_list = update_hitter_y_records(hitter_list, team_list)

    write_json('pitchers.json', {'Pitcher': pitcher_list})
    write_json('hitters.json', {'Hitter': hitter_list})
