import requests
import json
import copy
from decimal import Decimal
from common import YEAR, TEAM_LIST, HOME_DIC, pick_dick, PERSONAL_DATA_KEY, sum_deep_dict
from sabr.common import fix_rate_records, digits_under_one
from datastore_json import read_json, write_json


def average_pf(past_pf_dic, pf_str):
    total_pf_num = Decimal(
        past_pf_dic[str(YEAR - 1)][pf_str]) * Decimal('143') + Decimal(
            past_pf_dic[str(YEAR - 2)][pf_str]) * Decimal('143') + Decimal(
                past_pf_dic[str(YEAR - 3)][pf_str]) * Decimal('143') + Decimal(
                    past_pf_dic[str(YEAR - 4)][pf_str]) * Decimal('143')
    total_pf_den = Decimal('143') * 4
    raw_total_pf = total_pf_num / total_pf_den
    total_pf = digits_under_one(raw_total_pf, 2)
    return str(total_pf)


def initialize_team_dic(player):
    team_dic = {}
    for key, value in player.items():
        if key in PERSONAL_DATA_KEY:
            continue
        team_dic[key] = value
    return team_dic


def sum_team_records(player_list):
    sum_team_dic = {}
    for player in player_list:
        team = player.get('Team', '')
        if sum_team_dic.get(team, ''):
            sum_deep_dict(sum_team_dic[team], player)
        else:
            sum_team_dic[team] = initialize_team_dic(player)
    return sum_team_dic


def update_team_list(team_list, sum_team_dic):
    for team_dic in team_list:
        team = team_dic['チーム']
        for key, value in sum_team_dic[team].items():
            if team_dic.get(key, ''):
                continue
            else:
                team_dic[key] = value


def update_team_park_records():
    pitcher_list = read_json('pitchers.json')['Pitcher']
    hitter_list = read_json('hitters.json')['Hitter']
    team_list = read_json('teams.json')['Team']

    sum_team_pitcher_dic = sum_team_records(pitcher_list)
    fix_rate_records(sum_team_pitcher_dic)
    sum_team_hitter_dic = sum_team_records(hitter_list)
    fix_rate_records(sum_team_hitter_dic)

    update_team_list(team_list, sum_team_pitcher_dic)
    update_team_list(team_list, sum_team_hitter_dic)

    write_json('teams.json', {'Team': team_list})

    with open('datasource/past_parks.json', 'r') as f:
        past_pf_dic = json.load(f)

    pf_list = []
    for team_dic in team_list:
        team = team_dic['チーム']

        total_score_pf = average_pf(past_pf_dic[HOME_DIC[team]], '得点PF')
        total_hr_pf = average_pf(past_pf_dic[HOME_DIC[team]], 'HRPF')

        pf_list.append({
            '球場': HOME_DIC[team],
            '得点PF': total_score_pf,
            'HRPF': total_hr_pf
        })

    write_json('parks.json', {'Park': pf_list})
