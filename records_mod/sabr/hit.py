import json
from decimal import Decimal
from .common import (digits_under_one, single)


def hr_percent(hitter):
    atbat = Decimal(hitter['打数'])
    if not atbat:
        return '.000'
    raw_hr_percent = Decimal(hitter['本塁打']) / atbat
    hr_percent = digits_under_one(raw_hr_percent, 4)
    return str(hr_percent)[1:]


def bb_per_k(hitter):
    bb = Decimal(hitter['四球'])
    k = Decimal(hitter['三振'])
    if not bb:
        return '0.00'
    elif not k:
        return '99.99'
    raw_bb_per_k = bb / k
    bb_per_k = digits_under_one(raw_bb_per_k, 2)
    return str(bb_per_k)


def iso_p(hitter):
    """
    長打力指標
    IsoP＝（二塁打＋三塁打×2＋本塁打×3）÷打数
    """
    atbat = Decimal(hitter['打数'])
    if not atbat:
        return '.000'
    numerator = Decimal(hitter['二塁打']) + 2 * Decimal(
        hitter['三塁打']) + 3 * Decimal(hitter['本塁打'])
    raw_iso_p = numerator / atbat
    iso_p = digits_under_one(raw_iso_p, 3)
    return str(iso_p)[1:]


def iso_d(hitter):
    """
    選球眼指標
    IsoD＝ 出塁率 - 打率
    """
    raw_iso_d = Decimal(hitter['出塁率']) - Decimal(hitter['打率'])
    iso_d = digits_under_one(raw_iso_d, 3)
    return str(iso_d)[1:]


def bb_percent_h(hitter):
    """
    選球眼指標
    BB% = 四球 / 打席 * 100
    """
    apperance = Decimal(hitter['打席'])
    if not apperance:
        return '.000'
    raw_bb_percent = Decimal(hitter['四球']) / apperance * Decimal('100')
    bb_percent = digits_under_one(raw_bb_percent, 1)
    return str(bb_percent)


def k_percent_h(hitter):
    """
    K% = 三振 / 打席 * 100
    """
    apperance = Decimal(hitter['打席'])
    if not apperance:
        return '.000'
    raw_k_percent = Decimal(hitter['三振']) / apperance * Decimal('100')
    k_percent = digits_under_one(raw_k_percent, 1)
    return str(k_percent)


def babip_h(hitter):
    """
    フェアグラウンド打球の安打率
    BABIP = (安打 - 本塁打) / (打数 - 三振 - 本塁打 + 犠飛)
    """
    denominator = Decimal(hitter['打数']) - Decimal(hitter['三振']) - Decimal(
        hitter['本塁打']) + Decimal(hitter['犠飛'])
    if not denominator:
        return '.000'
    numerator = Decimal(hitter['安打']) - Decimal(hitter['本塁打'])
    raw_babip = numerator / denominator
    babip = digits_under_one(raw_babip, 3)
    return str(babip)[1:]


def true_average(hitter):
    # denominator = Decimal(hitter['打数']) + Decimal(hitter['四球']) + Decimal(
    #     hitter['死球']) + Decimal(hitter['犠打']) + Decimal(
    #         hitter['犠飛']) + Decimal(
    #             hitter['盗塁死']) + (Decimal(hitter['盗塁']) / Decimal('3'))
    # if not denominator:
    #     return '.000'
    # numerator = Decimal(hitter['安打']) + Decimal(hitter['塁打']) + Decimal(
    #     '1.5') * (Decimal(hitter['四球']) + Decimal(hitter['死球'])) + Decimal(
    #         hitter['犠打']) + Decimal(hitter['犠飛']) + Decimal(hitter['盗塁'])
    # raw_ta = numerator / denominator
    raw_ta = Decimal('0.26') + Decimal(hitter['wRAA']) / Decimal(hitter['打席']) * Decimal('0.9')
    true_average = digits_under_one(raw_ta, 3)
    return str(true_average)[1:]


def ops_plus(hitter, league, cor_pf):
    lg_obp = Decimal(league['出塁率'])
    lg_slg = Decimal(league['長打率'])
    if not lg_obp * lg_slg * cor_pf:
        return '0'
    raw_ops_plus = Decimal('100') * (Decimal(hitter['出塁率']) / lg_obp + Decimal(
        hitter['長打率']) / lg_slg - Decimal('1')) / cor_pf
    ops_plus = digits_under_one(raw_ops_plus, 0)
    return str(ops_plus)


def steal_percent(hitter):
    steal = Decimal(hitter['盗塁'])
    challenge = steal + Decimal(hitter['盗塁死'])
    if not challenge:
        return '0.0'
    raw_steal_percent = steal / challenge * Decimal('100')
    steal_percent = digits_under_one(raw_steal_percent, 1)
    return str(steal_percent)


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
        return '0.00'
    raw_wsb = steal_score - league_steal_score * steal_chance / league_steal_chance
    wsb = digits_under_one(raw_wsb, 2)
    return str(wsb)


def dan_percent(hitter):
    """
    TTO% = アダム・ダン率
    (本塁打 + 三振 + 四球) / 打席 * 100
    """
    if not Decimal(hitter['打席']):
        return '0.0'
    raw_dan_percent = (Decimal(hitter['本塁打']) + Decimal(hitter['三振']) +
                       Decimal(hitter['四球'])) / Decimal(
                           hitter['打席']) * Decimal('100')
    dan_percent = digits_under_one(raw_dan_percent, 1)
    return str(dan_percent)


def one_outs_h(hitter):
    outs = Decimal(hitter['打数']) - Decimal(hitter['安打']) + Decimal(
        hitter['盗塁死']) + Decimal(hitter['併殺打'])
    outs_per_3 = int(outs / 3)
    raw_oo = (Decimal(hitter['打点']) - Decimal(outs_per_3)) * Decimal('5000')
    oo = digits_under_one(raw_oo, 0)
    return str(oo)