import requests
import json
import copy
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


def sum_visitor_park_dick(sum_visitor_dic, team_parks_dic, team):
    for key, value in team_parks_dic.items():
        if key == HOME_DIC[team]:
            continue
        elif isinstance(value, dict):
            sum_visitor_park_dick(sum_visitor_dic, value, team)
        else:
            sum_visitor_dic[key] = sum_visitor_dic.get(key, '0')
            decimal_visitor_value = Decimal(
                sum_visitor_dic[key]) + Decimal(value)
            sum_visitor_dic[key] = str(decimal_visitor_value)


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

    for team_dic in team_list:
        team = team_dic['チーム']
        # team_dic['球場'] = park_dic[team]
        team_dic['本拠地'] = park_dic[team][HOME_DIC[team]]
        sum_visitor_dic = {}
        sum_visitor_park_dick(sum_visitor_dic, park_dic[team], team)
        team_dic['非本拠地'] = sum_visitor_dic

    fix_rate_records(team_dic)

    write_json('teams.json', {'Team': team_list})
