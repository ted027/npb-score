import json
import math
from decimal import Decimal
from .common import (digits_under_one, return_outcounts, single,
                     FULL_OUTCOUNTS, ZERO_VALUE, IGNORE_VALUE)


# A = 安打 + 四球 + 死球 - 盗塁死 - 併殺打
# B = 塁打 + 0.26 ×（四球 + 死球） + 0.53 ×（犠飛 + 犠打） + 0.64 × 盗塁 - 0.03 × 三振
# C = 打数 + 四球 + 死球 + 犠飛 + 犠打
def rc_basic(hitter):
    """
    総合得点能力指標
    """
    opportunity = Decimal(hitter['打数']) + Decimal(hitter['四球']) + Decimal(
        hitter['死球']) + Decimal(hitter['犠打']) + Decimal(hitter['犠飛'])
    if not opportunity:
        rc = raw_rc = IGNORE_VALUE
    else:
        on_base = Decimal(hitter['安打']) + Decimal(hitter['四球']) + Decimal(
            hitter['死球']) - Decimal(hitter['盗塁死']) - Decimal(hitter['併殺打'])
        advance_base = Decimal(hitter['塁打']) + Decimal('0.26') * (Decimal(
            hitter['四球']) + Decimal(hitter['死球'])) + Decimal('0.53') * (
                Decimal(hitter['犠飛']) +
                Decimal(hitter['犠打'])) + Decimal('0.64') * Decimal(
                    hitter['盗塁']) - Decimal('0.03') * Decimal(hitter['三振'])
        raw_rc = ((on_base + Decimal('2.4') * opportunity) *
                  (advance_base + Decimal('3') * opportunity) /
                  (Decimal('9') * opportunity)) - Decimal('0.9') * opportunity
        rc = digits_under_one(raw_rc, 2)
    return str(rc), raw_rc


XR_SINGLE = Decimal('0.5')
XR_DOUBLE = Decimal('0.72')
XR_TRIPLE = Decimal('1.04')
XR_HR = Decimal('1.44')
XR_BB = Decimal('0.34')
XR_IBB = Decimal('0.25')
XR_STEAL = Decimal('0.18')
XR_FAILED_STEAL = Decimal('-0.32')
XR_OUT = Decimal('-0.09')
XR_STRIKE_OUT = Decimal('-0.098')
XR_DOUBLE_PLAY = Decimal('-0.37')
XR_SAC_FLY = Decimal('0.37')
XR_SAC_BUNT = Decimal('0.04')


def xr_basic(hitter):
    """
    総合得点能力指標
    """
    raw_xr = XR_SINGLE * single(hitter) + XR_DOUBLE * Decimal(
        hitter['二塁打']) + XR_TRIPLE * Decimal(hitter['三塁打']) + XR_HR * Decimal(
            hitter['本塁打']) + XR_BB * (Decimal(hitter['四球']) + Decimal(
                hitter['死球']) - Decimal(hitter['故意四球'])) + XR_IBB * Decimal(
                    hitter['故意四球']) + XR_STEAL * Decimal(
                        hitter['盗塁']) + XR_FAILED_STEAL * Decimal(
                            hitter['盗塁死']) + XR_OUT * (
                                Decimal(hitter['打数']) - Decimal(hitter['安打']) -
                                Decimal(hitter['三振'])
                            ) + XR_STRIKE_OUT * Decimal(
                                hitter['三振']) + XR_DOUBLE_PLAY * Decimal(
                                    hitter['併殺打']) + XR_SAC_FLY * Decimal(
                                        hitter['犠飛']) + XR_SAC_BUNT * Decimal(
                                            hitter['犠打'])
    xr = digits_under_one(raw_xr, 2)
    return str(xr), raw_xr


def rc_xr_27(hitter, rc_xr):
    """
    総合得点能力指標
    RC(XR)27 = RC(XR) * 27 / (打数 - 安打 + 犠打 + 犠飛 + 盗塁死 + 併殺打)
    """
    total_out = Decimal(hitter['打数']) - Decimal(hitter['安打']) + Decimal(
        hitter['犠打']) + Decimal(hitter['犠飛']) + Decimal(
            hitter['盗塁死']) + Decimal(hitter['併殺打'])
    if not total_out:
        rc_xr_27 = IGNORE_VALUE
    else:
        raw_rc_xr_27 = rc_xr * FULL_OUTCOUNTS / total_out
        rc_xr_27 = digits_under_one(raw_rc_xr_27, 2)
    return str(rc_xr_27)


def rc_xr_plus(hitter, league, rc_xr, league_rc_xr):
    on_base = Decimal(hitter['打席'])
    league_on_base = Decimal(league['打席'])
    if not league_on_base:
        rc_xr_plus = raw_rc_xr_plus = ZERO_VALUE
    else:
        raw_rc_xr_plus = rc_xr - league_rc_xr / league_on_base * on_base
        rc_xr_plus = digits_under_one(raw_rc_xr_plus, 2)
    return str(rc_xr_plus), raw_rc_xr_plus


def rc_xr_win(hitter, full_league, rc_xr_plus):
    league_pitcher = full_league['Pitcher'][hitter['League']]
    league_hitter = full_league['Hitter'][hitter['League']]
    outcounts = return_outcounts(Decimal(league_pitcher['投球回']))
    if not outcounts:
        rc_xr_win = ZERO_VALUE
    else:
        runs_per_inning = Decimal('3') * (Decimal(
            league_hitter['得点']) + Decimal(league_pitcher['失点'])) / outcounts
        runs_per_win = Decimal('10') * Decimal(str(math.sqrt(runs_per_inning)))
        raw_rc_xr_win = rc_xr_plus / runs_per_win
        rc_xr_win = digits_under_one(raw_rc_xr_win, 2)
    return str(rc_xr_win)