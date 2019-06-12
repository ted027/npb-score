from decimal import Decimal

YEAR = 2019
TEAM_NUM = 6

RECORDS_DIRECTORY = 'records'

TEAM_LIST = [
    '西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天', '広島', 'ヤクルト', '巨人', 'ＤｅＮＡ',
    '中日', '阪神'
]

PARK_LIST = [
    "メットライフ", "ヤフオクドーム", "札幌ドーム", "京セラＤ大阪", "ＺＯＺＯマリン", "楽天生命パーク", "マツダスタジアム",
    "神宮", "東京ドーム", "横浜", "ナゴヤドーム", "甲子園"
]

HOME_DIC = dict(zip(TEAM_LIST, PARK_LIST))


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


def correct_pf(hitter, pf_list, game_str):
    correct_pf = Decimal('0')
    for key, value in hitter.get('球場', {}).items():
        pf = pick_dick(pf_list, '球場', key).get('得点PF', '1')
        correct_pf += Decimal(pf) * Decimal(value[game_str]) / Decimal(
            hitter[game_str])
    return correct_pf