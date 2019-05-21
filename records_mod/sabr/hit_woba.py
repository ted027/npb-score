import json
from decimal import Decimal
from .common import (digits_under_one, single)

WOBA_BB = Decimal('0.692')
WOBA_HBP = Decimal('0.73')
WOBA_SINGLE = Decimal('0.865')
WOBA_DOUBLE = Decimal('1.334')
WOBA_TRIPLE = Decimal('1.725')
WOBA_HR = Decimal('2.065')


def woba(hitter):
    denominator = Decimal(hitter['打数']) + Decimal(hitter['四球']) - Decimal(
        hitter['故意四球']) + Decimal(hitter['死球']) + Decimal(hitter['犠飛'])
    if not denominator:
        return '0'
    numerator = WOBA_BB * (
        Decimal(hitter['四球']) - Decimal(hitter['故意四球'])
    ) + WOBA_HBP * Decimal(hitter['死球']) + WOBA_SINGLE * single(
        hitter) + WOBA_DOUBLE * Decimal(hitter['二塁打']) + WOBA_TRIPLE * Decimal(
            hitter['三塁打']) + WOBA_HR * Decimal(hitter['本塁打'])
    raw_woba = numerator / denominator
    woba = digits_under_one(raw_woba, 3)
    return str(woba)


SWOBA_BB = Decimal('0.7')
SWOBA_SINGLE = Decimal('0.9')
SWOBA_DOUBLE_TIPLE = Decimal('1.3')
SWOBA_HR = Decimal('2.0')

SWOBA_S_DOUBLE = Decimal('1.25')
SWOBA_S_TRIPLE = Decimal('1.6')
SWOBA_S_STEAL = Decimal('0.25')
SWOBA_S_FAILED_STEAL = Decimal('-0.5')


def woba_basic(hitter):
    denominator = Decimal(hitter['打席']) - Decimal(hitter['故意四球']) - Decimal(
        hitter['犠打'])
    if not denominator:
        return '0'
    numerator = SWOBA_BB * (Decimal(hitter['四球']) + Decimal(
        hitter['死球']) - Decimal(hitter['故意四球'])) + SWOBA_SINGLE * single(
            hitter) + SWOBA_DOUBLE_TIPLE * (Decimal(hitter['二塁打']) + Decimal(
                hitter['三塁打'])) + SWOBA_HR * Decimal(hitter['本塁打'])
    raw_woba_b = numerator / denominator
    woba_b = digits_under_one(raw_woba_b, 3)
    return str(woba_b)


def woba_speed(hitter):
    denominator = Decimal(hitter['打席']) - Decimal(hitter['故意四球']) - Decimal(
        hitter['犠打'])
    if not denominator:
        return '0'
    numerator = SWOBA_BB * (
        Decimal(hitter['四球']) + Decimal(hitter['死球']) - Decimal(hitter['故意四球'])
    ) + SWOBA_SINGLE * single(hitter) + SWOBA_S_DOUBLE * Decimal(hitter[
        '二塁打']) + SWOBA_S_TRIPLE * Decimal(hitter['三塁打']) + SWOBA_HR * Decimal(
            hitter['本塁打']) + SWOBA_S_STEAL * Decimal(
                hitter['盗塁']) + SWOBA_S_FAILED_STEAL * Decimal(hitter['盗塁死'])
    raw_woba_s = numerator / denominator
    woba_s = digits_under_one(raw_woba_s, 3)
    return str(woba_s)


WOBA_SCALE = Decimal('1.24')


def wraa(hitter, league):
    """
    wRAA = (対象打者のwOBA - リーグwOBA) ÷ wOBAscale × 打席数
    """
    raw_wraa = (Decimal(hitter['wOBA']) - Decimal(
        league['wOBA'])) / WOBA_SCALE * Decimal(hitter['打席'])
    wraa = digits_under_one(raw_wraa, 3)
    return str(wraa)


def wrc(hitter, league):
    """
    wRC = wRAA + (リーグ総得点数 / リーグ総打席数) × 打席数
    """
    raw_wrc = Decimal(hitter['wRAA']) + (
        Decimal(league['得点']) / Decimal(league['打席'])) * Decimal(hitter['打席'])
    wrc = digits_under_one(raw_wrc, 3)
    return str(wrc)
