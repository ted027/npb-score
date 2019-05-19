import json
from decimal import Decimal
from sabr.common import (digits_under_one, return_outcounts, RECORDS_DIRECTORY,
                         FULL_OUTCOUNTS, ZERO_VALUE, IGNORE_VALUE,
                         fix_rate_records)
from datastore_json import read_json, write_json

PERSONAL_DATA_KEY = ['Name', 'Team', 'League', '規定']


def sum_deep_dict(league_dic, player):
    for key, value in player.items():
        if key in PERSONAL_DATA_KEY:
            continue
        if isinstance(value, dict):
            league_dic[key] = league_dic.get(key, {})
            sum_deep_dict(league_dic[key], value)
        else:
            decimal_league_value = Decimal(league_dic.get(
                key, '0')) + Decimal(value)
            league_dic[key] = str(decimal_league_value)


def sum_league_records(player_list):
    league_player_dic = {'Central': {}, 'Pacific': {}}
    for player in player_list:
        league_dic = league_player_dic[player['League']]
        sum_deep_dict(league_dic, player)
    fix_rate_records(league_player_dic)
    return league_player_dic


def write_league_records():
    pitcher_list = read_json('pitchers.json')['Pitcher']

    hitter_list = read_json('hitters.json')['Hitter']

    league_pitcher_dic = sum_league_records(pitcher_list)
    league_hitter_dic = sum_league_records(hitter_list)

    league_dic = {'Pitcher': league_pitcher_dic, 'Hitter': league_hitter_dic}

    write_json('league.json', league_dic)
