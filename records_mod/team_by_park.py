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

def additional_team_dict(team_list, player_list):
    additional_team_dict = {}
    for player in player_list:
        team = player.get('Team', '')
        if not additional_team_dict.get(team, ''):
            additional_team_dict[team] = {
                '二塁打': "0",
                '三塁打': "0",
                '塁打': "0",
                '打点': "0",
                '三振': "0",
                '四球': "0",
                '死球': "0",
                '犠打': "0",
                '犠飛': "0",
                '盗塁死': "0",
                '併殺打': "0",
                '失策': "0",
                "登板": "0",
                "完投": "0",
                "完封": "0",
                "QS": "0",
                "ホールド": "0",
                "HP": "0",
                "セーブ": "0",
                "被安打": "0",
                "被本塁打": "0",
                "奪三振": "0",
                "与四球": "0",
                "与死球": "0",
                "暴投": "0",
                "ボーク": "0",
                "失点": "0",
                "自責点": "0",
            }
        # dict捜査


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
    
    # write_json('teams.json', {'Team': team_list})

    write_json('parks.json', {'Park': pf_list})
