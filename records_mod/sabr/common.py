from decimal import Decimal, ROUND_HALF_UP

RECORDS_DIRECTORY = 'records'

FULL_OUTCOUNTS = Decimal('27')
ZERO_VALUE = Decimal('0')
IGNORE_VALUE = Decimal('-1')


def digits_under_one(value, digits):
    if not digits:
        base = 0
    else:
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
    return {}


TEAM_LIST = [
    '西武', 'ソフトバンク', '日本ハム', 'オリックス', 'ロッテ', '楽天', '広島', 'ヤクルト', '巨人', 'DeNA',
    '中日', '阪神'
]


def unify_teams(team_str):
    team_str = team_str.replace('ＤｅＮＡ', 'DeNA').replace('読売', '巨人')
    for team in TEAM_LIST:
        if team in team_str:
            return team


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
            lose = dic.get('敗戦', 0) or dic.get('敗北')
            denominator = Decimal(dic['勝利']) + Decimal(lose)
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