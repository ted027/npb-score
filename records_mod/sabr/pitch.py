import json
from decimal import Decimal
from .common import (digits_under_one, return_outcounts, FULL_OUTCOUNTS)


def qs_rate(pitcher):
    start = Decimal(pitcher['先発'])
    if not start:
        return '0.0'
    raw_qsrate = Decimal(pitcher['QS']) * Decimal('100') / start
    qsrate = digits_under_one(raw_qsrate, 1)
    return str(qsrate)


# def k_per_bb(pitcher):
#     bb = Decimal(pitcher['与四球'])
#     k = Decimal(pitcher['奪三振'])
#     if not k:
#         return '0'
#     elif not bb:
#         return '99.99'
#     raw_k_per_bb = k / bb
#     k_per_bb = digits_under_one(raw_k_per_bb, 2)
#     return  str(k_per_bb)

# def k_per_nine(pitcher):
#     innings = Decimal(pitcher['投球回'])
#     outcounts = return_outcounts(innings)
#     if not outcounts:
#         return '0'
#     raw_k_per_n = Decimal(pitcher['奪三振']) * FULL_OUTCOUNTS / outcounts
#     k_per_n = digits_under_one(raw_k_per_n, 2)
#     return str(k_per_n)


def bb_per_nine(pitcher):
    bb = Decimal(pitcher['与四球'])
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not bb:
        return '0.00'
    elif not outcounts:
        return '99.99'
    raw_bb_per_n = bb * FULL_OUTCOUNTS / outcounts
    bb_per_n = digits_under_one(raw_bb_per_n, 2)
    return str(bb_per_n)


def hr_per_nine(pitcher):
    hr = Decimal(pitcher['被本塁打'])
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not hr:
        return '0.00'
    elif not outcounts:
        return '99.99'
    raw_hr_per_n = hr * FULL_OUTCOUNTS / outcounts
    hr_per_n = digits_under_one(raw_hr_per_n, 2)
    return str(hr_per_n)


def bb_percent_p(pitcher):
    """
    BB% = 与四球 / 打者 * 100
    """
    apperance = Decimal(pitcher['打者'])
    if not apperance:
        return '0.0'
    raw_bb_percent = Decimal(pitcher['与四球']) / apperance * Decimal('100')
    bb_percent = digits_under_one(raw_bb_percent, 1)
    return str(bb_percent)


def k_percent_p(pitcher):
    """
    K% = 奪三振 / 打者 * 100
    """
    apperance = Decimal(pitcher['打者'])
    if not apperance:
        return '0.0'
    raw_k_percent = Decimal(pitcher['奪三振']) / apperance * Decimal('100')
    k_percent = digits_under_one(raw_k_percent, 1)
    return str(k_percent)


def hr_percent_p(pitcher):
    """
    HR% = 被本塁打 / 打者 * 100
    """
    apperance = Decimal(pitcher['打者'])
    if not apperance:
        return '0.0'
    raw_k_percent = Decimal(pitcher['被本塁打']) / apperance * Decimal('100')
    k_percent = digits_under_one(raw_k_percent, 2)
    return str(k_percent)


def k_bb_percent_p(pitcher):
    """
    K-BB% = K% - BB%
    """
    apperance = Decimal(pitcher['打者'])
    if not apperance:
        return '0.0'
    raw_k_bb_percent = (Decimal(pitcher['奪三振']) - Decimal(
        pitcher['与四球'])) / apperance * Decimal('100')
    k_bb_percent = digits_under_one(raw_k_bb_percent, 1)
    return str(k_bb_percent)


def lob_percent(pitcher):
    """
    LOB% = (安打 + 与四死球 - 失点) / (安打 + 与四死球 - 1.4 × 本塁打)
    """
    denominator = Decimal(pitcher['被安打']) + Decimal(pitcher['与四球']) + Decimal(
        pitcher['与死球']) - Decimal('1.4') * Decimal(pitcher['被本塁打'])
    if not denominator:
        return '0.0'
    numerator = Decimal(pitcher['被安打']) + Decimal(pitcher['与四球']) + Decimal(
        pitcher['与死球']) - Decimal(pitcher['失点'])
    raw_lob_percent = numerator / denominator * Decimal('100')
    lob_percent = digits_under_one(raw_lob_percent, 1)
    return str(lob_percent)


# def whip(pitcher):
#     runner = Decimal(pitcher['与四球']) + Decimal(pitcher['被安打'])
#     innings = Decimal(pitcher['投球回'])
#     outcounts = return_outcounts(innings)
#     if not runner:
#         return '0'
#     elif not outcounts:
#         return '99.99'
#     raw_whip = runner * 3 / outcounts
#     whip = digits_under_one(raw_whip, 2)
#     return str(whip)


def _fip_efira(pitcher):
    innings = Decimal(pitcher['投球回'])
    outcounts = return_outcounts(innings)
    if not outcounts:
        return Decimal('0')
    fip_efira = (Decimal('13') * Decimal(pitcher['被本塁打']) + Decimal('3') *
                 (Decimal(pitcher['与四球']) + Decimal(pitcher['与死球']) - Decimal(
                     pitcher['故意四球'])) -
                 Decimal('2') * Decimal(pitcher['奪三振'])) * 3 / outcounts
    return fip_efira


def fip(pitcher, league):
    pit_fip = _fip_efira(pitcher)
    lg_fip = _fip_efira(league)
    raw_fip = pit_fip + Decimal(league['防御率']) - lg_fip
    fip = digits_under_one(raw_fip, 2)
    return str(fip), raw_fip


def fip_ra(pitcher, league, raw_fip):
    if not Decimal(league['自責点']):
        return Decimal('0.00')
    lg_rar_minus_era = (Decimal(league['失点']) - Decimal(
        league['自責点'])) / Decimal(league['アウト']) * FULL_OUTCOUNTS
    raw_fip_ra = raw_fip + lg_rar_minus_era
    fip_ra = digits_under_one(raw_fip_ra, 2)
    return str(fip_ra), raw_fip_ra


def fip_pf(pitcher, league, cor_pf, raw_fip_ra):
    if not Decimal(league['アウト']):
        return Decimal('0.00')
    raw_fip_pf = raw_fip_ra + (Decimal('1') - cor_pf) * Decimal(
        league['失点']) / Decimal(league['アウト']) * FULL_OUTCOUNTS / cor_pf
    fip_pf = digits_under_one(raw_fip_pf, 2)
    return str(fip_pf)


def babip_p(pitcher):
    # denominator = Decimal(pitcher['被打数']) - Decimal(pitcher['奪三振']) - Decimal(
    #     pitcher['被本塁打']) + Decimal(pitcher['犠飛'])
    denominator = Decimal(pitcher['被打数']) - Decimal(pitcher['奪三振']) - Decimal(
        pitcher['被本塁打'])
    if not denominator:
        return '.000'
    numerator = Decimal(pitcher['被安打']) - Decimal(pitcher['被本塁打'])
    raw_babip = numerator / denominator
    babip = digits_under_one(raw_babip, 3)
    return str(babip)[1:]


def komatsu(pitcher):
    kd_point = Decimal(pitcher['アウト']) + (Decimal(pitcher['勝利']) + Decimal(
        pitcher['ホールド']) + Decimal(pitcher['セーブ'])) * Decimal('10')
    raw_kd = kd_point * Decimal('1000')
    kd = digits_under_one(raw_kd, 0)
    return str(kd)


def one_outs_p(pitcher):
    raw_oo = Decimal(pitcher['アウト']) * Decimal('500') - Decimal(
        pitcher['失点']) * Decimal('5000')
    oo = digits_under_one(raw_oo, 0)
    return str(oo)