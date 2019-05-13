import requests
import json
from bs4 import BeautifulSoup
from records import request_soup
from sabr.common import RECORDS_DIRECTORY
from datastore_json import read_json, write_json

YEAR = 2019
TEAM_INITIAL_LIST = [
    'l', 'h', 'f', 'b', 'm', 'e', 'c', 's', 'g', 'db', 'd', 't'
]

IBB_COLUMN_DICT = {'p': 18, 'b': 17}


def create_intentional_bb_dict(p_or_b):
    intentional_bb_dict = {}
    for team_initial in TEAM_INITIAL_LIST:
        url = f'http://npb.jp/bis/2019/stats/id{p_or_b}1_{team_initial}.html'
        soup = request_soup(url)
        player_trs = soup.find_all('tr', class_='ststats')
        team_intentional_bb_dict = {
            pl_trs.find('td', class_='stplayer').text.replace('　', ' '):
            pl_trs.find_all('td')[IBB_COLUMN_DICT[p_or_b]].text
            for pl_trs in player_trs
        }
        intentional_bb_dict.update(team_intentional_bb_dict)
    return intentional_bb_dict


def update_hitter_y_records():
    hitter_ibb_dict = create_intentional_bb_dict('b')
    
    hitter_list = read_json('hitters.json')['Hitter']

    for hitter in hitter_list:
        if not hitter['試合']:
            intentional_bb = '0'
        else:
            intentional_bb = hitter_ibb_dict.get(hitter['Name'], '0')
        hitter['故意四球'] = intentional_bb

    write_json('hitters.json', {'Hitter': hitter_list})


def update_pitcher_y_records():
    pitcher_ibb_dict = create_intentional_bb_dict('p')
    
    pitcher_list = read_json('pitchers.json')['Pitcher']

    for pitcher in pitcher_list:
        if not pitcher['登板']:
            intentional_bb = '0'
        else:
            intentional_bb = pitcher_ibb_dict.get(pitcher['Name'], '0')
        pitcher['故意四球'] = intentional_bb
    
    write_json('pitchers.json', {'Pitcher': pitcher_list})
