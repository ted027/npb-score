import json
from decimal import Decimal
from .common import (digits_under_one, return_outcounts, FULL_OUTCOUNTS,
                     ZERO_VALUE, IGNORE_VALUE)


def qs_rate(pitcher):
    start = Decimal(pitcher['先発'])
    if not start:
        qsrate = Decimal('0')
    else:
        raw_qsrate = Decimal(pitcher['QS']) * 100 / start
        qsrate = digits_under_one(raw_qsrate, 2)
    pitcher['QS率'] = str(qsrate)
    return pitcher


# def k_per_bb(pitcher):
#     bb = Decimal(pitcher['与四球'])
#     if not bb:
#         k_per_bb = IGNORE_VALUE
#     else:
#         raw_k_per_bb = Decimal(pitcher['奪三振']) / bb
#         k_per_bb = digits_under_one(raw_k_per_bb, 2)
#     pitcher['K/BB'] = str(k_per_bb)
#     return pitcher

# def k_per_nine(pitcher):
#     innings = Decimal(pitcher['投球回'])
#     outcounts = return_outcounts(innings)
#     if not outcounts:
#         k_per_n = IGNORE_VALUE
#     else:
#         raw_k_per_n = Decimal(pitcher['奪三振']) * FULL_OUTCOUNTS / outcounts
#         k_per_n = digits_under_one(raw_k_per_n, 2)
#     pitcher['奪三振率'] = str(k_per_n)
#     return pitcher


def bb_per_nine(pitcher):
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not outcounts:
        bb_per_n = IGNORE_VALUE
    else:
        raw_bb_per_n = Decimal(pitcher['与四球']) * FULL_OUTCOUNTS / outcounts
        bb_per_n = digits_under_one(raw_bb_per_n, 2)
    pitcher['BB/9'] = str(bb_per_n)
    return pitcher


def hr_per_nine(pitcher):
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not outcounts:
        hr_per_n = IGNORE_VALUE
    else:
        raw_hr_per_n = Decimal(pitcher['被本塁打']) * FULL_OUTCOUNTS / outcounts
        hr_per_n = digits_under_one(raw_hr_per_n, 2)
    pitcher['HR/9'] = str(hr_per_n)
    return pitcher


# def whip(pitcher):
#     innings = Decimal(pitcher['投球回'])
#     outcounts = return_outcounts(innings)
#     if not outcounts:
#         whip = IGNORE_VALUE
#     else:
#         raw_whip = (Decimal(pitcher['与四球']) +
#                     Decimal(pitcher['被安打'])) * 3 / outcounts
#         whip = digits_under_one(raw_whip, 2)
#     pitcher['WHIP'] = str(whip)
#     return pitcher


def _fip_efira(pitcher):
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not outcounts:
        fip_efira = ZERO_VALUE
    else:
        fip_efira = (Decimal('13') * Decimal(pitcher['被本塁打']) + Decimal('3') *
                     (Decimal(pitcher['与四球']) + Decimal(pitcher['与死球']) -
                      Decimal(pitcher['故意四球'])) -
                     Decimal('2') * Decimal(pitcher['奪三振'])) * 3 / outcounts
    return fip_efira


def fip(pitcher, league):
    pit_fip = _fip_efira(pitcher)
    lg_fip = _fip_efira(league)
    raw_fip = pit_fip + Decimal(league['防御率']) - lg_fip
    fip = digits_under_one(raw_fip, 2)
    pitcher['FIP'] = str(fip)
    return pitcher
