import json
from decimal import Decimal, ROUND_HALF_UP
from sabr.pitch import (qs_rate, bb_per_nine, hr_per_nine, fip)
from sabr.hit import (babip, iso_d, iso_p, bb_percent, bb_per_k, wsb)
from sabr.hit_woba import (woba, woba_basic, woba_speed, wraa, wrc)
from sabr.hit_rc import (rc_basic, rc_27, xr_basic, xr_27, rcaa)
from sabr.common import RECORDS_DIRECTORY


def calc_sabr_pitcher(pitcher, league_pitcher_dic=None):
    pitcher = qs_rate(pitcher)
    pitcher = bb_per_nine(pitcher)
    pitcher = hr_per_nine(pitcher)
    if league_pitcher_dic:
        pitcher = fip(pitcher, league_pitcher_dic)
    return pitcher


def calc_sabr_hitter(hitter,
                     league_hitter_dic=None,
                     league_rc=None,
                     league_xr=None):
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
        hitter = rcaa(hitter, raw_rc, league_hitter_dic, league_rc)
        # hitter = xraa(hitter, raw_xr, league_hitter_dic, league_xr)
        return hitter
    return hitter, raw_rc, raw_xr


def add_sabr_pitcher():
    with open(f'{RECORDS_DIRECTORY}/pitchers.json', 'r') as pf:
        pitcher_list = json.load(pf)['Pitcher']

    with open(f'{RECORDS_DIRECTORY}/league_pitchers.json', 'r') as lpf:
        league_pitcher_dic = json.load(lpf)

    for league in league_pitcher_dic.values():
        league = calc_sabr_pitcher(league)

    for pitcher in pitcher_list:
        pitcher = calc_sabr_pitcher(pitcher,
                                    league_pitcher_dic[pitcher['League']])

    with open(f'{RECORDS_DIRECTORY}/league_pitchers.json', 'w') as lpf:
        json.dump(league_pitcher_dic, lpf, indent=2, ensure_ascii=False)

    with open(f'{RECORDS_DIRECTORY}/pitchers.json', 'w') as pf:
        json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)


def add_sabr_hitter():
    with open(f'{RECORDS_DIRECTORY}/hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    with open(f'{RECORDS_DIRECTORY}/league_hitters.json', 'r') as lhf:
        league_hitter_dic = json.load(lhf)

    for league in league_hitter_dic.values():
        league, league_rc, league_xr = calc_sabr_hitter(league)

    for hitter in hitter_list:
        hitter = calc_sabr_hitter(hitter, league_hitter_dic[hitter['League']],
                                  league_rc, league_xr)

    with open(f'{RECORDS_DIRECTORY}/league_hitters.json', 'w') as lhf:
        json.dump(league_hitter_dic, lhf, indent=2, ensure_ascii=False)

    with open(f'{RECORDS_DIRECTORY}/hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
