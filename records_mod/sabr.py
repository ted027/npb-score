import json
from decimal import Decimal, ROUND_HALF_UP

FULL_OUTCOUNTS = 27
IGNORE_VALIE = -1


def _digits_under_one(value, digits):
    base = 10**(-1 * digits)
    return value.quantize(Decimal(str(base)), rounding=ROUND_HALF_UP)


def _return_outcounts(innings):
    int_innings = int(innings)
    dec_innings = innings - int_innings
    return 3 * int_innings + 10 * dec_innings


def qs_rate(pitcher):
    start = Decimal(pitcher['Records']['先発'])
    if not start:
        qsrate = 0
    else:
        raw_qsrate = Decimal(pitcher['Records']['QS']) * 100 / start
        qsrate = _digits_under_one(raw_qsrate, 2)
    pitcher['Records']['QS率'] = str(qsrate)
    return pitcher


# def k_per_bb(pitcher):
#     bb = Decimal(pitcher['Records']['与四球'])
#     if not bb:
#         k_per_bb = IGNORE_VALIE
#     else:
#         raw_k_per_bb = Decimal(pitcher['Records']['奪三振']) / bb
#         k_per_bb = _digits_under_one(raw_k_per_bb, 2)
#     pitcher['Records']['K/BB'] = str(k_per_bb)
#     return pitcher

# def k_per_nine(pitcher):
#     innings = Decimal(pitcher['Records']['投球回'])
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         k_per_n = IGNORE_VALIE
#     else:
#         raw_k_per_n = Decimal(pitcher['Records']['奪三振']) * FULL_OUTCOUNTS / outcounts
#         k_per_n = _digits_under_one(raw_k_per_n, 2)
#     pitcher['Records']['K/9'] = str(k_per_n)
#     return pitcher


def bb_per_nine(pitcher):
    innings = Decimal(pitcher['Records']['投球回'])
    outcounts = _return_outcounts(innings)
    if not outcounts:
        bb_per_n = IGNORE_VALIE
    else:
        raw_bb_per_n = Decimal(
            pitcher['Records']['与四球']) * FULL_OUTCOUNTS / outcounts
        bb_per_n = _digits_under_one(raw_bb_per_n, 2)
    pitcher['Records']['BB/9'] = str(bb_per_n)
    return pitcher


def hr_per_nine(pitcher):
    innings = Decimal(pitcher['Records']['投球回'])
    outcounts = _return_outcounts(innings)
    if not outcounts:
        hr_per_n = IGNORE_VALIE
    else:
        raw_hr_per_n = Decimal(
            pitcher['Records']['被本塁打']) * FULL_OUTCOUNTS / outcounts
        hr_per_n = _digits_under_one(raw_hr_per_n, 2)
    pitcher['Records']['HR/9'] = str(hr_per_n)
    return pitcher


# def whip(pitcher):
#     innings = Decimal(pitcher['Records']['投球回'])
#     outcounts = _return_outcounts(innings)
#     if not outcounts:
#         whip = IGNORE_VALIE
#     else:
#         raw_whip = (Decimal(pitcher['Records']['与四球']) +
#                     Decimal(pitcher['Records']['被安打'])) * 3 / outcounts
#         whip = _digits_under_one(raw_whip, 2)
#     pitcher['Records']['WHIP'] = str(whip)
#     return pitcher


def _single(hitter):
    return Decimal(hitter['Records']['安打']) - Decimal(
        hitter['Records']['二塁打']) - Decimal(
            hitter['Records']['三塁打']) - Decimal(hitter['Records']['本塁打'])


WOBA_BB = Decimal('0.692')
WOBA_HBP = Decimal('0.73')
WOBA_SINGLE = Decimal('0.865')
WOBA_DOUBLE = Decimal('1.334')
WOBA_TRIPLE = Decimal('1.725')
WOBA_HR = Decimal('2.065')


def woba(hitter):
    denominator = Decimal(hitter['Records']['打数']) + Decimal(
        hitter['Records']['四球']) - Decimal(
            hitter['Records']['故意四球']) + Decimal(
                hitter['Records']['死球']) + Decimal(hitter['Records']['犠飛'])
    if not denominator or denominator < 0:
        woba = IGNORE_VALIE
    else:
        numerator = WOBA_BB * (Decimal(hitter['Records']['四球']) - Decimal(
            hitter['Records']['故意四球'])) + WOBA_HBP * Decimal(hitter['Records'][
                '死球']) + WOBA_SINGLE * _single(hitter) + WOBA_DOUBLE * Decimal(
                    hitter['Records']['二塁打']) + WOBA_TRIPLE * Decimal(
                        hitter['Records']['三塁打']) + WOBA_HR * Decimal(
                            hitter['Records']['本塁打'])
        raw_woba = numerator / denominator
        woba = _digits_under_one(raw_woba, 3)
    hitter['Records']['wOBA'] = str(woba)
    return hitter


SWOBA_BB = Decimal('0.7')
SWOBA_SINGLE = Decimal('0.9')
SWOBA_DOUBLE_TIPLE = Decimal('1.3')
SWOBA_HR = Decimal('2.0')

SWOBA_S_DOUBLE = Decimal('1.25')
SWOBA_S_TRIPLE = Decimal('1.6')
SWOBA_S_STEAL = Decimal('0.25')
SWOBA_S_FAILED_STEAL = Decimal('0.5')


def woba_basic(hitter):
    denominator = Decimal(hitter['Records']['打席']) - Decimal(
        hitter['Records']['故意四球']) - Decimal(hitter['Records']['犠打'])
    if not denominator or denominator < 0:
        woba_b = IGNORE_VALIE
    else:
        numerator = SWOBA_BB * (
            Decimal(hitter['Records']['四球']) + Decimal(
                hitter['Records']['死球']) - Decimal(hitter['Records']['故意四球'])
        ) + SWOBA_SINGLE * _single(hitter) + SWOBA_DOUBLE_TIPLE * (
            Decimal(hitter['Records']['二塁打']) +
            Decimal(hitter['Records']['三塁打'])) + SWOBA_HR * Decimal(
                hitter['Records']['本塁打'])
        raw_woba_b = numerator / denominator
        woba_b = _digits_under_one(raw_woba_b, 3)
    hitter['Records']['wOBA(Basic)'] = str(woba_b)
    return hitter


def woba_speed(hitter):
    denominator = Decimal(hitter['Records']['打席']) - Decimal(
        hitter['Records']['故意四球']) - Decimal(hitter['Records']['犠打'])
    if not denominator or denominator < 0:
        woba_s = IGNORE_VALIE
    else:
        numerator = SWOBA_BB * (
            Decimal(hitter['Records']['四球']) + Decimal(
                hitter['Records']['死球']) - Decimal(hitter['Records']['故意四球'])
        ) + SWOBA_SINGLE * _single(hitter) + SWOBA_S_DOUBLE * Decimal(
            hitter['Records']['二塁打']) + SWOBA_S_TRIPLE * Decimal(
                hitter['Records']['三塁打']) + SWOBA_HR * Decimal(
                    hitter['Records']['本塁打']) + SWOBA_S_STEAL * Decimal(hitter[
                        'Records']['盗塁']) - SWOBA_S_FAILED_STEAL * Decimal(
                            hitter['Records']['盗塁死'])
        raw_woba_s = numerator / denominator
        woba_s = _digits_under_one(raw_woba_s, 3)
    hitter['Records']['wOBA(Speed)'] = str(woba_s)
    return hitter


def bb_per_k(hitter):
    k = Decimal(hitter['Records']['三振'])
    if not k:
        bb_per_k = IGNORE_VALIE
    else:
        raw_bb_per_k = Decimal(hitter['Records']['四球']) / k
        bb_per_k = _digits_under_one(raw_bb_per_k, 2)
    hitter['Records']['BB/K'] = str(bb_per_k)
    return hitter


def add_sabr_pitcher():
    with open('pitchers.json', 'r') as pf:
        pitcher_list = json.load(pf)['Pitcher']

    for pitcher in pitcher_list:
        pitcher = qs_rate(pitcher)
        pitcher = bb_per_nine(pitcher)
        pitcher = hr_per_nine(pitcher)

    with open('pitchers.json', 'w') as pf:
        json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)


def add_sabr_hitter():
    with open('hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    for hitter in hitter_list:
        hitter = woba(hitter)
        hitter = woba_basic(hitter)
        hitter = woba_speed(hitter)
        hitter = bb_per_k(hitter)

    with open('hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
