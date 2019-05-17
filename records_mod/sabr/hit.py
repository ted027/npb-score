import json
from decimal import Decimal
from .common import (digits_under_one, single, ZERO_VALUE, IGNORE_VALUE)


def bb_per_k(hitter):
    k = Decimal(hitter['三振'])
    if not k:
        bb_per_k = IGNORE_VALUE
    else:
        raw_bb_per_k = Decimal(hitter['四球']) / k
        bb_per_k = digits_under_one(raw_bb_per_k, 2)
    return str(bb_per_k)


def iso_p(hitter):
    """
    長打力指標
    IsoP＝（二塁打＋三塁打×2＋本塁打×3）÷打数
    """
    atbat = Decimal(hitter['打数'])
    if not atbat:
        iso_p = ZERO_VALUE
    else:
        numerator = Decimal(hitter['二塁打']) + 2 * Decimal(
            hitter['三塁打']) + 3 * Decimal(hitter['本塁打'])
        raw_iso_p = numerator / atbat
        iso_p = digits_under_one(raw_iso_p, 3)
    return str(iso_p)


def iso_d(hitter):
    """
    選球眼指標
    IsoD＝ 出塁率 - 打率
    """
    iso_d = Decimal(hitter['出塁率']) - Decimal(hitter['打率'])
    return str(iso_d)


def bb_percent(hitter):
    """
    選球眼指標
    BB% = 四球 / 打席
    """
    apperance = Decimal(hitter['打席'])
    if not apperance:
        bb_percent = ZERO_VALUE
    else:
        raw_bb_percent = Decimal(hitter['四球']) / apperance
        bb_percent = digits_under_one(raw_bb_percent, 3)
    return str(bb_percent)


def babip_h(hitter):
    """
    フェアグラウンド打球の安打率
    BABIP = (安打 - 本塁打) / (打数 - 三振 - 本塁打 + 犠飛)
    """
    denominator = Decimal(hitter['打数']) - Decimal(hitter['三振']) - Decimal(
        hitter['本塁打']) + Decimal(hitter['犠飛'])
    if not denominator:
        babip = IGNORE_VALUE
    else:
        numerator = Decimal(hitter['安打']) - Decimal(hitter['本塁打'])
        raw_babip = numerator / denominator
        babip = digits_under_one(raw_babip, 3)
    return str(babip)


STEAL_SCORE = Decimal('0.18')
FAILED_STEAL_SCORE = Decimal('-0.32')


def _wsb_part(record):
    steal_score = Decimal(record['盗塁']) * STEAL_SCORE + Decimal(
        record['盗塁死']) * FAILED_STEAL_SCORE
    steal_chance = single(record) + Decimal(record['四球']) + Decimal(
        record['死球']) - Decimal(record['故意四球'])
    return steal_score, steal_chance


def wsb(hitter, league):
    """
    盗塁指標
    """
    steal_score, steal_chance = _wsb_part(hitter)
    league_steal_score, league_steal_chance = _wsb_part(league)
    if not league_steal_chance:
        wsb = IGNORE_VALUE
    else:
        raw_wsb = steal_score - league_steal_score * steal_chance / league_steal_chance
        wsb = digits_under_one(raw_wsb, 2)
    return str(wsb)
