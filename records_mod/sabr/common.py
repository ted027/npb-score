from decimal import Decimal, ROUND_HALF_UP

RECORDS_DIRECTORY = 'records'

FULL_OUTCOUNTS = Decimal('27')
ZERO_VALUE = Decimal('0')
IGNORE_VALUE = Decimal('-1')


def digits_under_one(value, digits):
    base = 10**(-1 * digits)
    return value.quantize(Decimal(str(base)), rounding=ROUND_HALF_UP)


def return_outcounts(innings):
    int_innings = int(innings)
    dec_innings = innings - int_innings
    return 3 * int_innings + 10 * dec_innings


def single(hitter):
    return Decimal(hitter['安打']) - Decimal(hitter['二塁打']) - Decimal(
        hitter['三塁打']) - Decimal(hitter['本塁打'])


def pick_dick(list_of_dict, str_key, str_value):
    for dic in list_of_dict:
        if dic[str_key] == str_value:
            return dic


TEAM_LIST = [
    '西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天', '広島', '読売', 'ヤクルト', 'ＤｅＮＡ',
    '中日', '阪神'
]


def unify_teams(team_str):
    team_str = team_str.replace('DeNA', 'ＤｅＮＡ').replace('巨人', '読売')
    for team in TEAM_LIST:
        if team in team_str:
            return team
