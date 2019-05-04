import requests
import json
from bs4 import BeautifulSoup
from records.records import request_soup

YEAR = 2019
TEAM_INITIAL_LIST = ['l','h','f','b','m','e','c','s','g','db','d','t']

INTENTIONAL_BB_COLUMN = 17

with open('hitters.json', 'r') as pf:
    hitter_list = json.load(pf)['Hitter']

for team_initial in TEAM_INITIAL_LIST:
    url = f'http://npb.jp/bis/2019/stats/idb1_{team_initial}.html'
    soup = request_soup(url)
    player_trs = soup.find_all('tr', class_='ststats')
    players = [pl_trs.find('td', class_='stplayer').text.replace('　', ' ') for pl_trs in player_trs]
