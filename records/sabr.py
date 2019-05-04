import json
from math import modf
from decimal import Decimal, ROUND_HALF_UP

FULL_OUTCOUNTS = 27

with open('pitchers.json', 'r') as pf:
    pitcher_list = json.load(pf)['Pitcher']

with open('hitters.json', 'r') as hf:
    hitter_list = json.load(hf)['Hitter']


def _two_digits_under_one(value):
    return Decimal(str(value)).quantize(Decimal('0.01'),
                                        rounding=ROUND_HALF_UP)


def _three_digits_under_one(value):
    return Decimal(str(value)).quantize(Decimal('0.001'),
                                        rounding=ROUND_HALF_UP)


def _int_records(player, item):
    return int(player['Records'][item])


def _return_outcounts(innings):
    if innings == '-':
        return 0
    dec_innings, int_innings = modf(float(innings))
    return int(3 * int_innings + 10 * dec_innings)


def qs_rate(pitcher):
    start = pitcher['Records']['先発']
    if start == '-':
        qsrate = '-'
    elif start == '0':
        qsrate = '0'
    else:
        raw_qsrate = _int_records(pitcher, 'QS') * 100.0 / int(start)
        qsrate = _two_digits_under_one(raw_qsrate)
    pitcher['Records']['QS率'] = str(qsrate)
    return pitcher


# def k_per_bb(pitcher):
#     bb = pitcher['Records']['与四球']
#     if bb == '0' or bb == '-':
#         k_per_bb = '-'
#     else:
#         raw_k_per_bb = _int_records(pitcher, '奪三振') * 1.0 / int(bb)
#         k_per_bb = _two_digits_under_one(raw_k_per_bb)
#     pitcher['Records']['K/BB'] = str(k_per_bb)

# def k_per_nine(pitcher):
#     innings = pitcher['Records']['投球回']
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         k_per_n = '-'
#     else:
#         raw_k_per_n = _int_records(pitcher,
#                                    '奪三振') * FULL_OUTCOUNTS * 1.0 / outcounts
#         k_per_n = _two_digits_under_one(raw_k_per_n)
#     pitcher['Records']['K/9'] = str(k_per_n)


def bb_per_nine(pitcher):
    innings = pitcher['Records']['投球回']
    outcounts = _return_outcounts(innings)
    if not outcounts:
        bb_per_n = '-'
    else:
        raw_bb_per_n = _int_records(pitcher,
                                    '与四球') * FULL_OUTCOUNTS * 1.0 / outcounts
        bb_per_n = _two_digits_under_one(raw_bb_per_n)
    pitcher['Records']['BB/9'] = str(bb_per_n)


def hr_per_nine(pitcher):
    innings = pitcher['Records']['投球回']
    outcounts = _return_outcounts(innings)
    if not outcounts:
        hr_per_n = '-'
    else:
        raw_hr_per_n = _int_records(pitcher,
                                    '被本塁打') * FULL_OUTCOUNTS * 1.0 / outcounts
        hr_per_n = _two_digits_under_one(raw_hr_per_n)
    pitcher['Records']['HR/9'] = str(hr_per_n)


# def whip(pitcher):
#     innings = pitcher['Records']['投球回']
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         whip = '-'
#     else:
#         raw_whip = _int_records(
#             pitcher, '与四球') + _int_records(pitcher, '被安打') / outcounts
#         whip = _two_digits_under_one(raw_whip)
#     pitcher['Records']['WHIP'] = str(whip)


def _single(hitter):
    return _int_records(hitter, '安打') - _int_records(
        hitter, '二塁打') - _int_records(hitter, '三塁打') - _int_records(
            hitter, '本塁打')


WOBA_BB = 0.692
WOBA_HBP = 0.73
WOBA_SINGLE = 0.865
WOBA_DOUBLE = 1.334
WOBA_TRIPLE = 1.725
WOBA_HR = 2.065


def woba(hitter):
    atbat = hitter['Records']['打席']
    if atbat == '0' or atbat == '-':
        woba = '-'
    else:
        numerator = WOBA_BB * (_int_records(hitter, '四球') - _int_records(
            hitter, '故意四球')) + WOBA_HBP * _int_records(
                hitter, '死球'
            ) + WOBA_SINGLE * _single(hitter) + WOBA_DOUBLE * _int_records(
                hitter, '二塁打') + WOBA_TRIPLE * _int_records(
                    hitter, '三塁打') + WOBA_HR * _int_records(hitter, '本塁打')
        denominator = _int_records(hitter, '打数') + _int_records(
            hitter, '四球') - _int_records(hitter, '故意四球') + _int_records(
                hitter, '死球') + _int_records(hitter, '犠飛')
        raw_woba = numerator / denominator
        woba = _three_digits_under_one(raw_woba)
    hitter['Records']['wOBA'] = str(woba)[1:]


def woba_basic(hitter):
    atbat = hitter['Records']['打席']
    if atbat == '0' or atbat == '-':
        woba_b = '-'
    else:
        numerator = 0.7 * (_int_records(hitter, '四球') + _int_records(
            hitter, '死球') - _int_records(hitter, '故意四球')) + 0.9 * _single(
                hitter) + 1.3 * (_int_records(hitter, '二塁打') + _int_records(
                    hitter, '三塁打')) + 2.0 * _int_records(hitter, '本塁打')
        denominator = _int_records(hitter, '打数') - _int_records(
            hitter, '故意四球') - _int_records(hitter, '犠打')
        raw_woba_b = numerator / denominator
        woba_b = _three_digits_under_one(raw_woba_b)
    hitter['Records']['wOBA(Basic)'] = str(woba_b)[1:]


def woba_speed(hitter):
    atbat = hitter['Records']['打席']
    if atbat == '0' or atbat == '-':
        woba_s = '-'
    else:
        numerator = 0.7 * (_int_records(hitter, '四球') + _int_records(
            hitter, '死球') - _int_records(
                hitter, '故意四球')) + 0.9 * _single(hitter) + 1.25 * _int_records(
                    hitter, '二塁打'
                ) + 1.6 * _int_records(hitter, '三塁打') + 2.0 * _int_records(
                    hitter, '本塁打') + 0.25 * _int_records(
                        hitter, '盗塁') - 0.5 * _int_records(hitter, '盗塁死')
        denominator = _int_records(hitter, '打数') - _int_records(
            hitter, '故意四球') - _int_records(hitter, '犠打')
        raw_woba_s = numerator / denominator
        woba_s = _three_digits_under_one(raw_woba_s)
    hitter['Records']['wOBA(Speed)'] = str(woba_s)[1:]


def bb_per_k(hitter):
    k = hitter['Records']['三振']
    if k == '0' or k == '-':
        bb_per_k = '-'
    else:
        raw_bb_per_k = _int_records(hitter, '四球') * 1.0 / int(k)
        bb_per_k = _two_digits_under_one(raw_bb_per_k)
    hitter['Records']['BB/K'] = str(bb_per_k)