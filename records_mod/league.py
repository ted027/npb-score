import json
from decimal import Decimal
from sabr.common import (digits_under_one, return_outcounts, RECORDS_DIRECTORY,
                         FULL_OUTCOUNTS, ZERO_VALUE, IGNORE_VALUE)
from datastore_json import read_json, write_json

PERSONAL_DATA_KEY = ['Name', 'Team', 'League', '規定']


def fix_rate_records_obp(dic):
    denominator = (Decimal(dic['打数']) + Decimal(dic['四球']) + Decimal(dic['死球'])
                   + Decimal(dic['犠飛']))
    if not denominator:
        return ZERO_VALUE
    return (Decimal(dic['安打']) + Decimal(dic['四球']) + Decimal(
        dic['死球'])) / denominator


def fix_rate_common(dic, decimal_nume, decimal_deno):
    if not decimal_deno:
        return ZERO_VALUE
    return decimal_nume / decimal_deno


def fix_rate_records(dic):
    for key, value in dic.items():
        if isinstance(value, dict):
            fix_rate_records(value)
        elif key == '打率':
            fix_value = fix_rate_common(dic, Decimal(dic['安打']),
                                        Decimal(dic['打数']))
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == '出塁率':
            fix_value = fix_rate_records_obp(dic)
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == '長打率':
            fix_value = fix_rate_common(dic, Decimal(dic['塁打']),
                                        Decimal(dic['打数']))
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == 'OPS':
            fix_value1 = fix_rate_records_obp(dic)
            fix_value2 = fix_rate_common(dic, Decimal(dic['塁打']),
                                         Decimal(dic['打数']))
            dic[key] = str(digits_under_one(fix_value1 + fix_value2, 3))
        elif key == '得点圏打率':
            fix_value = fix_rate_common(dic, Decimal(dic['得点圏安打']),
                                        Decimal(dic['得点圏打数']))
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == '防御率':
            numerator = Decimal(dic['自責点']) * FULL_OUTCOUNTS
            denominator = return_outcounts(Decimal(dic['投球回']))
            fix_value = fix_rate_common(dic, numerator, denominator)
            dic[key] = str(digits_under_one(fix_value, 2))
        elif key == '勝率':
            denominator = Decimal(dic['勝利']) + Decimal(dic['敗戦'])
            fix_value = fix_rate_common(dic, Decimal(dic['勝利']), denominator)
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == '被打率':
            fix_value = fix_rate_common(dic, Decimal(dic['被安打']),
                                        Decimal(dic['被打数']))
            dic[key] = str(digits_under_one(fix_value, 3))
        elif key == 'K/BB':
            fix_value = fix_rate_common(dic, Decimal(dic['奪三振']),
                                        Decimal(dic['与四球']))
            dic[key] = str(digits_under_one(fix_value, 2))
        elif key == '奪三振率':
            numerator = Decimal(dic['奪三振']) * FULL_OUTCOUNTS
            denominator = return_outcounts(Decimal(dic['投球回']))
            fix_value = fix_rate_common(dic, numerator, denominator)
            dic[key] = str(digits_under_one(fix_value, 2))
        elif key == 'WHIP':
            numerator = Decimal('3') * (
                Decimal(dic['与四球']) + Decimal(dic['被安打']))
            denominator = return_outcounts(Decimal(dic['投球回']))
            fix_value = fix_rate_common(dic, numerator, denominator)
            dic[key] = str(digits_under_one(fix_value, 2))


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
