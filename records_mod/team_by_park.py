import requests
import json
from decimal import Decimal
from sabr.common import pick_dick, fix_rate_records, TEAM_LIST
from datastore_json import read_json, write_json

PARK_LIST = [
    "メットライフ", "ヤフオクドーム", "札幌ドーム", "京セラＤ大阪", "ＺＯＺＯマリン", "楽天生命パーク", "マツダスタジアム",
    "神宮", "東京ドーム", "横浜", "ナゴヤドーム", "甲子園"
]

HOME_DIC = dict(zip(TEAM_LIST, PARK_LIST))


def sum_park_dick(team_park_dic, player_park_dic):
    for key, value in player_park_dic.items():
        if isinstance(value, dict):
            team_park_dic[key] = team_park_dic.get(key, {})
            sum_park_dick(team_park_dic[key], value)
        else:
            decimal_team_value = Decimal(team_park_dic.get(
                key, '0')) + Decimal(value)
            team_park_dic[key] = str(decimal_team_value)


def update_team_park_records():
    pitcher_list = read_json('pitchers.json')['Pitcher']

    hitter_list = read_json('hitters.json')['Hitter']

    team_list = read_json('teams.json')['Team']

    park_dic = {}
    for pitcher in pitcher_list:
        team = pitcher['Team']
        park_dic[team] = park_dic.get(team, {})
        sum_park_dick(park_dic[team], pitcher['球場'])

    for hitter in hitter_list:
        team = hitter['Team']
        park_dic[team] = park_dic.get(team, {})
        sum_park_dick(park_dic[team], hitter['球場'])

    fix_rate_records(park_dic)

    for team_dic in team_list:
        team_dic['球場'] = park_dic[team_dic['チーム']]

    write_json('teams.json', {'Team': team_list})
