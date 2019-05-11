import json
from decimal import Decimal, ROUND_HALF_UP
from sabr.pitch import (qs_rate, bb_per_nine, hr_per_nine, fip)
from sabr.hit import (babip, iso_d, iso_p, bb_percent, bb_per_k, wsb)
from sabr.hit_woba import (woba, woba_basic, woba_speed, wraa, wrc)
from sabr.hit_rc import (rc_basic, xr_basic, rc_xr_27, rc_xr_plus, rc_xr_win)
from sabr.common import RECORDS_DIRECTORY


def calc_sabr_pitcher(pitcher, league_pitcher_dic=None):
    pitcher['QS率'] = qs_rate(pitcher)
    pitcher['BB/9'] = bb_per_nine(pitcher)
    pitcher['HR/9'] = hr_per_nine(pitcher)
    if league_pitcher_dic:
        pitcher['FIP'] = fip(pitcher, league_pitcher_dic)
    return pitcher


def calc_sabr_hitter(hitter,
                     league_dic=None,
                     league_rc=None,
                     league_xr=None):
    """
    第一引数がhitterならleague_hitter_dic, league_rc, league_xrも同時に渡す
    第一引数がleagueなら第二〜第四引数は指定しない
    """
    hitter['wOBA'] = woba(hitter)
    hitter['wOBA(Basic)'] = woba_basic(hitter)
    hitter['wOBA(Speed)'] = woba_speed(hitter)
    hitter['RC'], raw_rc = rc_basic(hitter)
    hitter['RC27'] = rc_xr_27(hitter, raw_rc)
    hitter['XR'], raw_xr = xr_basic(hitter)
    hitter['XR27'] = rc_xr_27(hitter, raw_xr)
    hitter['IsoP'] = iso_p(hitter)
    hitter['BB/K'] = bb_per_k(hitter)
    hitter['BB%'] = bb_percent(hitter)
    hitter['IsoD'] = iso_d(hitter)
    hitter['BABIP'] = babip(hitter)
    if league_dic:
        league_hitter_dic = league_dic['Hitter'][hitter['League']]
        hitter['wRAA'] = wraa(hitter, league_hitter_dic)
        hitter['wRC'] = wrc(hitter, league_hitter_dic)
        hitter['RCAA'], raw_rcaa = rc_xr_plus(hitter, league_hitter_dic, raw_rc, league_rc)
        hitter['RCWIN'] = rc_xr_win(hitter, league_dic, raw_rcaa)
        hitter['XR+'], raw_xr_plus = rc_xr_plus(hitter, league_hitter_dic, raw_xr, league_xr)
        hitter['XRWIN'] = rc_xr_win(hitter, league_dic, raw_xr_plus)
        hitter['wSB'] = wsb(hitter, league_hitter_dic)
        return hitter
    return hitter, raw_rc, raw_xr


def add_sabr_pitcher():
    with open(f'{RECORDS_DIRECTORY}/pitchers.json', 'r') as pf:
        pitcher_list = json.load(pf)['Pitcher']

    with open(f'{RECORDS_DIRECTORY}/league.json', 'r') as lf:
        league_dic = json.load(lf)
    
    league_pitcher_dic = league_dic['Pitcher']

    for league in league_pitcher_dic.values():
        league = calc_sabr_pitcher(league)

    for pitcher in pitcher_list:
        pitcher = calc_sabr_pitcher(pitcher,
                                    league_pitcher_dic[pitcher['League']])

    with open(f'{RECORDS_DIRECTORY}/league.json', 'w') as lf:
        json.dump(league_dic, lf, indent=2, ensure_ascii=False)

    with open(f'{RECORDS_DIRECTORY}/pitchers.json', 'w') as pf:
        json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)


def add_sabr_hitter():
    with open(f'{RECORDS_DIRECTORY}/hitters.json', 'r') as hf:
        hitter_list = json.load(hf)['Hitter']

    with open(f'{RECORDS_DIRECTORY}/league.json', 'r') as lf:
        league_dic = json.load(lf)

    league_hitter_dic = league_dic['Hitter']

    for league in league_hitter_dic.values():
        league, league_rc, league_xr = calc_sabr_hitter(league)

    for hitter in hitter_list:
        hitter = calc_sabr_hitter(hitter, league_dic,
                                  league_rc, league_xr)

    with open(f'{RECORDS_DIRECTORY}/league.json', 'w') as lf:
        json.dump(league_dic, lf, indent=2, ensure_ascii=False)

    with open(f'{RECORDS_DIRECTORY}/hitters.json', 'w') as hf:
        json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
