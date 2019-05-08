import requests
import json
from bs4 import BeautifulSoup
from records import request_soup

YEAR = 2019
TEAM_INITIAL_LIST = [
    'l', 'h', 'f', 'b', 'm', 'e', 'c', 's', 'g', 'db', 'd', 't'
]

INTENTIONAL_BB_COLUMN = 17


def create_intentional_bb_dict(p_or_b):
    intentional_bb_dict = {}
    for team_initial in TEAM_INITIAL_LIST:
        url = f'http://npb.jp/bis/2019/stats/id{p_or_b}1_{team_initial}.html'
        soup = request_soup(url)
        player_trs = soup.find_all('tr', class_='ststats')
        team_intentional_bb_dict = {
            pl_trs.find('td', class_='stplayer').text.replace('　', ' '):
            pl_trs.find_all('td')[INTENTIONAL_BB_COLUMN].text
            for pl_trs in player_trs
        }
        intentional_bb_dict.update(team_intentional_bb_dict)
    return intentional_bb_dict


def update_hitter_y_records():
    hitter_ibb_dict = create_intentional_bb_dict('b')

    with open('hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    for hitter in hitter_list:
        if not hitter['試合']:
            intentional_bb = '0'
        else:
            intentional_bb = hitter_ibb_dict.get(hitter['Name'], '0')
        hitter['故意四球'] = intentional_bb

    with open('hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)


def update_pitcher_y_records():
    pitcher_ibb_dict = create_intentional_bb_dict('p')

    with open('pitchers.json', 'r') as pf:
        pitcher_list = json.load(pf)['Pitcher']

    for pitcher in pitcher_list:
        if not pitcher['登板']:
            intentional_bb = '0'
        else:
            intentional_bb = pitcher_ibb_dict.get(pitcher['Name'], '0')
        pitcher['故意四球'] = intentional_bb

    with open('pitchers.json', 'w') as pf:
        json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)
