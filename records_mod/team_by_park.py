import requests
import json
import copy
from decimal import Decimal
from common import YEAR, TEAM_LIST, HOME_DIC, pick_dick
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


def update_team_park_records():
    pitcher_list = read_json('pitchers.json')['Pitcher']

    hitter_list = read_json('hitters.json')['Hitter']

    team_list = read_json('teams.json')['Team']

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
