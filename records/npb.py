import requests
import json
from bs4 import BeautifulSoup
from records import request_soup

YEAR = 2019
TEAM_INITIAL_LIST = ['l','h','f','b','m','e','c','s','g','db','d','t']

INTENTIONAL_BB_COLUMN = 17


def create_intentional_bb_dict():
    intentional_bb_dict = {}
    for team_initial in TEAM_INITIAL_LIST:
        url = f'http://npb.jp/bis/2019/stats/idb1_{team_initial}.html'
        soup = request_soup(url)
        player_trs = soup.find_all('tr', class_='ststats')
        team_intentional_bb_dict = {pl_trs.find('td', class_='stplayer').text.replace('　', ' '): pl_trs.find_all('td')[INTENTIONAL_BB_COLUMN].text for pl_trs in player_trs}
        intentional_bb_dict.update(team_intentional_bb_dict)
    return intentional_bb_dict


def update_y_records():
    intentional_bb_dict = create_intentional_bb_dict()

    with open('hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    for hitter in hitter_list:
        if hitter['Records']['試合'] == '-':
            intentional_bb = '-'
        else:
            intentional_bb = intentional_bb_dict.get(hitter['Name'], '0')
        hitter['Records']['故意四球'] = intentional_bb

    with open('hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
