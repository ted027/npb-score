import requests
import time
from decimal import Decimal
from bs4 import BeautifulSoup


YEAR = 2
TEAM_NUM = 6

RECORDS_DIRECTORY = f'records/{YEAR}'

PERSONAL_DATA_KEY = ['Name', 'Team', 'League', '規定', '背番号', '選手名']

TEAM_LIST = [
    '西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天', '広島', 'ヤクルト', '巨人', 'ＤｅＮＡ',
    '中日', '阪神'
]

CENTRAL_LIST = ['広島', '巨人', 'ヤクルト', 'ＤｅＮＡ', '中日', '阪神']
PACIFIC_LIST = ['西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天']

PARK_LIST = [
    "メットライフ", "ヤフオクドーム", "札幌ドーム", "京セラＤ大阪", "ＺＯＺＯマリン", "楽天生命パーク", "マツダスタジアム",
    "神宮", "東京ドーム", "横浜", "ナゴヤドーム", "甲子園"
]

HOME_DIC = dict(zip(TEAM_LIST, PARK_LIST))


def request_soup(url, time_before: int, time_after: int):
    while True:
        time.sleep(time_before)
        res = requests.get(url)
        if 200 <= res.status_code < 300 and res.content:
            break
        else:
            print(f'{res.status_code}: {res.url}')
            time.sleep(time_after)
    return BeautifulSoup(res.content, 'html.parser')


def full_val(str_val):
    str_val = str_val.strip()
    if str_val == '-':
        return '0'
    return str_val.replace('\n', '')


def unify_teams(team_str):
    team_str = team_str.replace('DeNA', 'ＤｅＮＡ').replace('読売', '巨人')
    for team in TEAM_LIST:
        if team in team_str:
            return team


def pick_dick(list_of_dict, str_key, str_value):
    for dic in list_of_dict:
        if dic[str_key] == str_value:
            return dic
    return {}


def correct_pf(player, pf_list, game_str):
    correct_pf = Decimal('0')
    for key, value in player.get('球場', {}).items():
        pf = pick_dick(pf_list, '球場', key).get('得点PF', '1')
        correct_pf += Decimal(pf) * Decimal(value[game_str]) / Decimal(
            player[game_str])
    return correct_pf


def calc_parkfactor(player, pf_list, game_str):
    cor_pf = correct_pf(player, pf_list, game_str)
    if not cor_pf:
        print(player['Name'])
        print(f'PF補正係数: {cor_pf}')
        # 暫定実装
        return Decimal('1')
    return cor_pf


def sum_deep_dict(set_dic, player):
    for key, value in player.items():
        if key in PERSONAL_DATA_KEY:
            continue
        # 圏打数, 圏安打が取れず再計算出来ないため
        elif key == '圏打率':
            continue
        if isinstance(value, dict):
            set_dic[key] = set_dic.get(key, {})
            sum_deep_dict(set_dic[key], value)
        else:
            decimal_set_value = Decimal(set_dic.get(key, '0')) + Decimal(value)
            set_dic[key] = str(decimal_set_value)
