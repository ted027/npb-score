import json
from math import modf
from decimal import Decimal, ROUND_HALF_UP

FULL_OUTCOUNTS = 27

with open('pitchers.json', 'r') as pf:
    pitcher_list = json.load(pf)['Pitcher']


def _two_digits_under_one(value):
    return Decimal(str(value)).quantize(Decimal('0.01'),
                                        rounding=ROUND_HALF_UP)


def _return_outcounts(innings):
    if innings == '-':
        return 0
    dec_innings, int_innings = modf(innings)
    return 3 * int_innings + 10 * dec_innings


def qs_rate(pitcher):
    start = pitcher['Records']['先発']
    if start == '-':
        qsrate = '-'
    elif start == '0':
        qsrate = '0'
    else:
        raw_qsrate = pitcher['Records']['QS'] * 100.0 / start
        qsrate = _two_digits_under_one(raw_qsrate)
    pitcher['Records']['QS率'] = qsrate


# def k_per_bb(pitcher):
#     bb = pitcher['Records']['与四球']
#     if not bb or bb == '-':
#         k_per_bb = '-'
#     else:
#         raw_k_per_bb = pitcher['Records']['奪三振'] + 1.0 / bb
#         k_per_bb = _two_digits_under_one(raw_k_per_bb)
#     pitcher['Records']['K/BB'] = k_per_bb


# def k_per_nine(pitcher):
#     innings = pitcher['Records']['投球回']
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         k_per_n = '-'
#     else:
#         raw_k_per_n = pitcher['Records'][
#             '奪三振'] * FULL_OUTCOUNTS * 1.0 / outcounts
#         k_per_n = _two_digits_under_one(raw_k_per_n)
#     pitcher['Records']['K/9'] = k_per_n


def bb_per_nine(pitcher):
    innings = pitcher['Records']['投球回']
    outcounts = _return_outcounts(innings)
    if not outcounts:
        bb_per_n = '-'
    else:
        raw_bb_per_n = pitcher['Records'][
            '与四球'] * FULL_OUTCOUNTS * 1.0 / outcounts
        bb_per_n = _two_digits_under_one(raw_bb_per_n)
    pitcher['Records']['BB/9'] = bb_per_n


def hr_per_nine(pitcher):
    innings = pitcher['Records']['投球回']
    outcounts = _return_outcounts(innings)
    if not outcounts:
        hr_per_n = '-'
    else:
        raw_hr_per_n = pitcher['Records'][
            '被本塁打'] * FULL_OUTCOUNTS * 1.0 / outcounts
        hr_per_n = _two_digits_under_one(raw_hr_per_n)
    pitcher['Records']['HR/9'] = hr_per_n


# def whip(pitcher):
#     innings = pitcher['Records']['投球回']
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         whip = '-'
#     else:
#         raw_whip = pitcher['Records'][
#             '与四球'] + pitcher['Records']['被安打'] / outcounts
#         whip = _two_digits_under_one(raw_whip)
#     pitcher['Records']['WHIP'] = whip