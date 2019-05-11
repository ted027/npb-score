import json
from decimal import Decimal, ROUND_HALF_UP
from common import digits_under_one, return_outcounts, single, FULL_OUTCOUNTS, ZERO_VALUE, IGNORE_VALUE


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


WOBA_BB = Decimal('0.692')
WOBA_HBP = Decimal('0.73')
WOBA_SINGLE = Decimal('0.865')
WOBA_DOUBLE = Decimal('1.334')
WOBA_TRIPLE = Decimal('1.725')
WOBA_HR = Decimal('2.065')


def woba(hitter):
    denominator = Decimal(hitter['打数']) + Decimal(hitter['四球']) - Decimal(
        hitter['故意四球']) + Decimal(hitter['死球']) + Decimal(hitter['犠飛'])
    if not denominator or denominator < 0:
        woba = IGNORE_VALUE
    else:
        numerator = WOBA_BB * (Decimal(hitter['四球']) - Decimal(
            hitter['故意四球'])) + WOBA_HBP * Decimal(hitter[
                '死球']) + WOBA_SINGLE * single(hitter) + WOBA_DOUBLE * Decimal(
                    hitter['二塁打']) + WOBA_TRIPLE * Decimal(
                        hitter['三塁打']) + WOBA_HR * Decimal(hitter['本塁打'])
        raw_woba = numerator / denominator
        woba = digits_under_one(raw_woba, 3)
    hitter['wOBA'] = str(woba)
    return hitter


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
    if not denominator or denominator < 0:
        woba_b = IGNORE_VALUE
    else:
        numerator = SWOBA_BB * (Decimal(hitter['四球']) + Decimal(
            hitter['死球']) - Decimal(hitter['故意四球'])) + SWOBA_SINGLE * single(
                hitter) + SWOBA_DOUBLE_TIPLE * (
                    Decimal(hitter['二塁打']) + Decimal(
                        hitter['三塁打'])) + SWOBA_HR * Decimal(hitter['本塁打'])
        raw_woba_b = numerator / denominator
        woba_b = digits_under_one(raw_woba_b, 3)
    hitter['wOBA(Basic)'] = str(woba_b)
    return hitter


def woba_speed(hitter):
    denominator = Decimal(hitter['打席']) - Decimal(hitter['故意四球']) - Decimal(
        hitter['犠打'])
    if not denominator or denominator < 0:
        woba_s = IGNORE_VALUE
    else:
        numerator = SWOBA_BB * (Decimal(hitter['四球']) + Decimal(
            hitter['死球']) - Decimal(hitter['故意四球'])) + SWOBA_SINGLE * single(
                hitter) + SWOBA_S_DOUBLE * Decimal(
                    hitter['二塁打']) + SWOBA_S_TRIPLE * Decimal(
                        hitter['三塁打']) + SWOBA_HR * Decimal(
                            hitter['本塁打']) + SWOBA_S_STEAL * Decimal(
                                hitter['盗塁']) + SWOBA_S_FAILED_STEAL * Decimal(
                                    hitter['盗塁死'])
        raw_woba_s = numerator / denominator
        woba_s = digits_under_one(raw_woba_s, 3)
    hitter['wOBA(Speed)'] = str(woba_s)
    return hitter


WOBA_SCALE = Decimal('1.24')


def wraa(hitter, league):
    """
    wRAA = (対象打者のwOBA - リーグwOBA) ÷ wOBAscale × 打席数
    """
    raw_wraa = (Decimal(hitter['wOBA']) - Decimal(league['wOBA'])) / WOBA_SCALE * Decimal(hitter['打席'])
    wraa = digits_under_one(raw_wraa, 3)
    hitter['wRAA'] = str(wraa)
    return hitter


def wrc(hitter, league):
    """
    wRC = wRAA + (リーグ総得点数 / リーグ総打席数) × 打席数
    """
    raw_wrc = Decimal(hitter['wRAA']) + (Decimal(league['得点']) / Decimal(league['打席'])) * Decimal(hitter['打席'])
    wrc = digits_under_one(raw_wrc, 3)
    hitter['wRC'] = str(wrc)
    return hitter


def bb_per_k(hitter):
    k = Decimal(hitter['三振'])
    if not k:
        bb_per_k = IGNORE_VALUE
    else:
        raw_bb_per_k = Decimal(hitter['四球']) / k
        bb_per_k = digits_under_one(raw_bb_per_k, 2)
    hitter['BB/K'] = str(bb_per_k)
    return hitter


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
    hitter['IsoP'] = str(iso_p)
    return hitter


def iso_d(hitter):
    """
    選球眼指標
    IsoD＝ 出塁率 - 打率
    """
    iso_d = Decimal(hitter['出塁率']) - Decimal(hitter['打率'])
    hitter['IsoD'] = str(iso_d)
    return hitter


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
    hitter['BB%'] = str(bb_percent)
    return hitter


def babip(hitter):
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
    hitter['BABIP'] = str(babip)
    return hitter


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
                Decimal(hitter['犠飛']) + Decimal(
                    hitter['犠打'])) + Decimal('0.64') * Decimal(
                        hitter['盗塁']) - Decimal('0.03') * Decimal(hitter['三振'])
        raw_rc = ((on_base + Decimal('2.4') * opportunity) *
                  (advance_base + Decimal('3') * opportunity) /
                  (Decimal('9') * opportunity)) - Decimal('0.9') * opportunity
        rc = digits_under_one(raw_rc, 2)
    hitter['RC'] = str(rc)
    return hitter, raw_rc


def rc_27(hitter, rc):
    """
    総合得点能力指標
    RC27 = RC * 27 / (打数 - 安打 + 犠打 + 犠飛 + 盗塁死 + 併殺打)
    """
    total_out = Decimal(hitter['打数']) - Decimal(hitter['安打']) + Decimal(
        hitter['犠打']) + Decimal(hitter['犠飛']) + Decimal(
            hitter['盗塁死']) + Decimal(hitter['併殺打'])
    if not total_out:
        rc_27 = IGNORE_VALUE
    else:
        raw_rc_27 = rc * 27 / total_out
        rc_27 = digits_under_one(raw_rc_27, 2)
    hitter['RC27'] = str(rc_27)
    return hitter


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
                                Decimal(hitter['打数']) - Decimal(
                                    hitter['安打']) - Decimal(hitter['三振'])
                            ) + XR_STRIKE_OUT * Decimal(
                                hitter['三振']) + XR_DOUBLE_PLAY * Decimal(
                                    hitter['併殺打']) + XR_SAC_FLY * Decimal(
                                        hitter['犠飛']) + XR_SAC_BUNT * Decimal(
                                            hitter['犠打'])
    xr = digits_under_one(raw_xr, 2)
    hitter['XR'] = str(xr)
    return hitter, raw_xr


def xr_27(hitter, xr):
    """
    総合得点能力指標
    XR27 = XR * 27 / (打数 - 安打 + 犠打 + 犠飛 + 盗塁死 + 併殺打)
    """
    total_out = Decimal(hitter['打数']) - Decimal(hitter['安打']) + Decimal(
        hitter['犠打']) + Decimal(hitter['犠飛']) + Decimal(
            hitter['盗塁死']) + Decimal(hitter['併殺打'])
    if not total_out:
        xr_27 = IGNORE_VALUE
    else:
        raw_xr_27 = xr * 27 / total_out
        xr_27 = digits_under_one(raw_xr_27, 2)
    hitter['XR27'] = str(xr_27)
    return hitter


STEAL_SCORE = Decimal('0.18')
FAILED_STEAL_SCORE = Decimal('-0.32')


def _wsb_part(record):
    steal_score = Decimal(record['盗塁']) * STEAL_SCORE + Decimal(record['盗塁死']) * FAILED_STEAL_SCORE
    steal_chance = single(record) + Decimal(record['四球']) +  Decimal(record['死球']) - Decimal(record['故意四球'])
    return steal_score, steal_chance


def wsb(hitter, league):
    """
    盗塁指標
    """
    steal_chance, steal_score = _wsb_part(hitter)
    league_steal_chance, league_steal_score = _wsb_part(league)
    if not league_steal_chance:
        wsb = IGNORE_VALUE
    else:
        raw_wsb = steal_score - league_steal_score * steal_chance / league_steal_chance
        wsb = digits_under_one(raw_wsb, 2)
    hitter['wSB'] = str(wsb)
    return hitter
   

def calc_sabr_pitcher(pitcher, league_pitcher_dic=None):
    pitcher = qs_rate(pitcher)
    pitcher = bb_per_nine(pitcher)
    pitcher = hr_per_nine(pitcher)
    if league_pitcher_dic:
        pitcher = fip(pitcher, league_pitcher_dic)
    return pitcher


def calc_sabr_hitter(hitter, league_hitter_dic=None):
    hitter = woba(hitter)
    hitter = woba_basic(hitter)
    hitter = woba_speed(hitter)
    hitter, raw_rc = rc_basic(hitter)
    hitter = rc_27(hitter, raw_rc)
    hitter, raw_xr = xr_basic(hitter)
    hitter = xr_27(hitter, raw_xr)
    hitter = babip(hitter)
    hitter = iso_p(hitter)
    hitter = iso_d(hitter)
    hitter = bb_percent(hitter)
    hitter = bb_per_k(hitter)
    if league_hitter_dic:
        hitter = wraa(hitter, league_hitter_dic)
        hitter = wrc(hitter, league_hitter_dic)
        hitter = wsb(hitter, league_hitter_dic)
    return hitter


def add_sabr_pitcher():
    with open('pitchers.json', 'r') as pf:
        pitcher_list = json.load(pf)['Pitcher']

    with open('league_pitchers.json', 'r') as lpf:
        league_pitcher_dic = json.load(lpf)

    for league in league_pitcher_dic.values():
        league = calc_sabr_pitcher(league)

    for pitcher in pitcher_list:
        pitcher = calc_sabr_pitcher(pitcher, league_pitcher_dic[pitcher['League']])

    with open('pitchers.json', 'w') as pf:
        json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)


def add_sabr_hitter():
    with open('hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    with open('league_hitters.json', 'r') as lhf:
        league_hitter_dic = json.load(lhf)
    
    for league in league_hitter_dic.values():
        league = calc_sabr_hitter(league)

    for hitter in hitter_list:
        hitter = calc_sabr_hitter(hitter, league_hitter_dic[hitter['League']])

    with open('hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
