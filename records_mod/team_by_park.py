import requests
import json
import copy
from decimal import Decimal
from common import YEAR, TEAM_LIST, HOME_DIC, pick_dick
from sabr.common import fix_rate_records, digits_under_one
from datastore_json import read_json, write_json


def park_factor(team_dic, hit_str, pit_str):
    """
    HRPF＝｛（A球場でのB球団本塁打＋A球場でのB球団被本塁打）／A球場での試合数｝
    ／｛（A球場以外の球場でのB球団本塁打＋A球場以外の球場でのB球団被本塁打）／A球場以外の球場での試合数｝
    """
    home_denominator = Decimal(team_dic['本拠地']['試合'])
    visitor_denominator = Decimal(team_dic['非本拠地']['試合'])
    if not home_denominator or not visitor_denominator:
        return '0'
    visitor = (Decimal(team_dic['非本拠地'][hit_str]) + Decimal(
        team_dic['非本拠地'][pit_str])) / visitor_denominator
    if not visitor:
        return '0'
    home = (Decimal(team_dic['本拠地'][hit_str]) + Decimal(
        team_dic['本拠地'][pit_str])) / home_denominator
    raw_pf = home / visitor
    park_factor = digits_under_one(raw_pf, 2)
    return str(park_factor)


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


def additional_team_records(team_dic):
    team_dic['四球'] = str(
        Decimal(team_dic['本拠地']['四球']) + Decimal(team_dic['非本拠地']['四球']))
    team_dic['奪三振'] = str(
        Decimal(team_dic['本拠地']['奪三振']) + Decimal(team_dic['非本拠地']['奪三振']))
    team_dic['与四球'] = str(
        Decimal(team_dic['本拠地']['与四球']) + Decimal(team_dic['非本拠地']['与四球']))
    # UI表示の改行防止のため
    team_dic['被HR'] = str(
        Decimal(team_dic['本拠地']['被本塁打']) + Decimal(team_dic['非本拠地']['被本塁打']))


def average_pf(live_pf, live_game_num, past_pf_dic, pf_str):
    total_pf_num = Decimal(live_pf) * Decimal(live_game_num) + Decimal(
        past_pf_dic[str(YEAR - 1)][pf_str]) * Decimal('143') + Decimal(
            past_pf_dic[str(YEAR - 2)][pf_str]) * Decimal('143') + Decimal(
                past_pf_dic[str(YEAR - 3)][pf_str]) * Decimal('143') + Decimal(
                    past_pf_dic[str(YEAR - 4)][pf_str]) * Decimal('143')
    total_pf_den = Decimal(live_game_num) + Decimal('143') * 4
    raw_total_pf = total_pf_num / total_pf_den
    total_pf = digits_under_one(raw_total_pf, 2)
    return str(total_pf)


def update_team_park_records():
    pitcher_list = read_json('pitchers.json')['Pitcher']

    hitter_list = read_json('hitters.json')['Hitter']

    team_list = read_json('teams.json')['Team']

    with open('datasource/past_parks.json', 'r') as f:
        past_pf_dic = json.load(f)

    park_dic = {}
    for pitcher in pitcher_list:
        if not pitcher.get('球場', 0):
            continue
        team = pitcher['Team']
        park_dic[team] = park_dic.get(team, {})
        sum_park_dick(park_dic[team], pitcher['球場'])

    def tmp_regular_dic(regular_dic, team, hitter):
        regular_dic[team] = regular_dic.get(team, {})
        regular_dic[team]['試合'] = regular_dic[team].get('試合', '0')
        if Decimal(hitter['試合']) > Decimal(regular_dic[team]['試合']):
            regular_dic[team]['試合'] = hitter['試合']
            regular_dic[team]['球場'] = regular_dic[team].get('球場', {})
            for key, value in hitter['球場'].items():
                regular_dic[team]['球場'][key] = {'試合': value['試合']}

    regular_dic = {}

    for hitter in hitter_list:
        if not hitter.get('球場', 0):
            continue
        team = hitter['Team']
        park_dic[team] = park_dic.get(team, {})
        sum_park_dick(park_dic[team], hitter['球場'])

        tmp_regular_dic(regular_dic, team, hitter)

    for team in TEAM_LIST:
        for key, value in regular_dic[team]['球場'].items():
            park_dic[team][key]['試合'] = value['試合']

    pf_list = []
    for team_dic in team_list:
        team = team_dic['チーム']
        team_dic['本拠地'] = park_dic[team][HOME_DIC[team]]
        sum_visitor_dic = {}
        sum_visitor_park_dick(sum_visitor_dic, park_dic[team], team)
        team_dic['非本拠地'] = sum_visitor_dic

        fix_rate_records(team_dic['本拠地'])
        fix_rate_records(team_dic['非本拠地'])

        additional_team_records(team_dic)

        live_score_pf = park_factor(team_dic, '打点', '失点')
        live_hr_pf = park_factor(team_dic, '本塁打', '被本塁打')

        total_score_pf = average_pf(live_score_pf, team_dic['試合'],
                                    past_pf_dic[HOME_DIC[team]], '得点PF')
        total_hr_pf = average_pf(live_hr_pf, team_dic['試合'],
                                 past_pf_dic[HOME_DIC[team]], 'HRPF')

        pf_list.append({
            '球場': HOME_DIC[team],
            '得点PF': total_score_pf,
            'HRPF': total_hr_pf,
            str(YEAR): {
                '得点PF': live_score_pf,
                'HRPF': live_hr_pf
            }
        })

    write_json('teams.json', {'Team': team_list})

    write_json('parks.json', {'Park': pf_list})
