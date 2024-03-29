import json
from decimal import Decimal, ROUND_HALF_UP
from common import RECORDS_DIRECTORY, calc_parkfactor
from sabr.pitch import (qs_rate, bb_per_nine, hr_per_nine, bb_percent_p,
                        k_percent_p, hr_percent_p, k_bb_percent_p, lob_percent,
                        fip, fip_ra, fip_pf, babip_p, komatsu, one_outs_p)
from sabr.hit import (hr_percent, babip_h, iso_d, iso_p, bb_percent_h,
                      k_percent_h, bb_per_k, steal_percent, wsb, ops_plus,
                      dan_percent, one_outs_h, true_average)
from sabr.hit_woba import (woba, woba_basic, woba_speed, wraa, wrc, wrc_plus)
from sabr.hit_rc import (rc_basic, xr_basic, rc_xr_27, rc_xr_plus, rc_xr_win)
from datastore_json import read_json, write_json


def calc_sabr_pitcher(pitcher, league_pitcher_dic=None, cor_pf=None, query_type=""):
    # individual 'detail' pageだとデフォルト存在のため
    if query_type == 'summary': pitcher['QS率'] = qs_rate(pitcher)
    pitcher['BABIP'] = babip_p(pitcher)
    pitcher['BB/9'] = bb_per_nine(pitcher)
    pitcher['HR/9'] = hr_per_nine(pitcher)
    pitcher['K%'] = k_percent_p(pitcher)
    pitcher['BB%'] = bb_percent_p(pitcher)
    pitcher['HR%'] = hr_percent_p(pitcher)
    pitcher['K-BB%'] = k_bb_percent_p(pitcher)
    pitcher['LOB%'] = lob_percent(pitcher)
    pitcher['小松式ドネーション'] = komatsu(pitcher)
    pitcher['ONE OUTS(万)'] = one_outs_p(pitcher)
    if league_pitcher_dic:
        pitcher['FIP'], raw_fip = fip(pitcher, league_pitcher_dic)
        pitcher['FIP(RA)'], raw_fip_ra = fip_ra(pitcher, league_pitcher_dic,
                                                raw_fip)
        pitcher['FIP_pf'] = fip_pf(pitcher, league_pitcher_dic, cor_pf,
                                   raw_fip_ra)
    return pitcher


def calc_sabr_hitter(hitter,
                     league_dic=None,
                     league_rc=None,
                     league_xr=None,
                     cor_pf=None):
    """
    第一引数がhitterならleague_dic, league_rc, league_xr, cor_pfも同時に渡す
    第一引数がleagueなら第二〜第五引数は指定しない
    """
    hitter['本塁打率'] = hr_percent(hitter)
    # UI表示の改行防止のため
    hitter['盗成功率'] = steal_percent(hitter)
    hitter['wOBA'] = woba(hitter)
    # hitter['wOBA(Basic)'] = woba_basic(hitter)
    # hitter['wOBA(Speed)'] = woba_speed(hitter)
    hitter['RC'], raw_rc = rc_basic(hitter)
    hitter['RC27'] = rc_xr_27(hitter, raw_rc)
    hitter['XR'], raw_xr = xr_basic(hitter)
    hitter['XR27'] = rc_xr_27(hitter, raw_xr)
    hitter['IsoP'] = iso_p(hitter)
    hitter['BB/K'] = bb_per_k(hitter)
    hitter['BB%'] = bb_percent_h(hitter)
    hitter['K%'] = k_percent_h(hitter)
    hitter['IsoD'] = iso_d(hitter)
    hitter['BABIP'] = babip_h(hitter)
    hitter['アダムダン率'] = dan_percent(hitter)
    hitter['ONE OUTS(万)'] = one_outs_h(hitter)
    if league_dic and cor_pf:
        league_hitter_dic = league_dic['Hitter'][hitter['League']]
        hitter['wRAA'], raw_wraa = wraa(hitter, league_hitter_dic)
        hitter['wRC'], raw_wrc = wrc(hitter, league_hitter_dic, raw_wraa)
        hitter['wRC+'] = wrc_plus(hitter, league_hitter_dic, cor_pf, raw_wrc)
        hitter['OPS+'] = ops_plus(hitter, league_hitter_dic, cor_pf)
        hitter['TAv'] = true_average(hitter)
        hitter['RCAA'], raw_rcaa = rc_xr_plus(hitter, league_hitter_dic,
                                              raw_rc, league_rc)
        hitter['RCWIN'] = rc_xr_win(hitter, league_dic, raw_rcaa)
        hitter['XR+'], raw_xr_plus = rc_xr_plus(hitter, league_hitter_dic,
                                                raw_xr, league_xr)
        hitter['XRWIN'] = rc_xr_win(hitter, league_dic, raw_xr_plus)
        hitter['wSB'] = wsb(hitter, league_hitter_dic)
        return hitter
    return hitter, raw_rc, raw_xr


def add_sabr_pitcher():
    # query as team 'summary' page or individual 'detail' page
    query_type = 'detail'

    pitcher_list = read_json('pitchers.json')['Pitcher']

    league_dic = read_json('league.json')

    league_pitcher_dic = league_dic['Pitcher']

    pf_list = read_json('parks.json')['Park']

    for league in league_pitcher_dic.values():
        league = calc_sabr_pitcher(league, query_type="summary")

    for pitcher in pitcher_list:
        # 暫定実装
        cor_pf = Decimal('1')
        if query_type == 'detail':
            cor_pf = calc_parkfactor(pitcher, pf_list, '登板')
        pitcher = calc_sabr_pitcher(
            pitcher, league_pitcher_dic[pitcher['League']], cor_pf, query_type)

    write_json('league.json', league_dic)

    write_json('pitchers.json', {'Pitcher': pitcher_list})


def add_sabr_hitter():
    # query as team 'summary' page or individual 'detail' page
    query_type = 'detail'
    hitter_list = read_json('hitters.json')['Hitter']

    league_dic = read_json('league.json')

    league_hitter_dic = league_dic['Hitter']

    pf_list = read_json('parks.json')['Park']

    for league in league_hitter_dic.values():
        league, league_rc, league_xr = calc_sabr_hitter(league)

    for hitter in hitter_list:
        # 暫定実装
        cor_pf = Decimal('1')
        if query_type == 'detail': cor_pf = calc_parkfactor(hitter, pf_list, '試合')
        hitter = calc_sabr_hitter(hitter, league_dic, league_rc, league_xr,
                                  cor_pf)

    write_json('league.json', league_dic)

    write_json('hitters.json', {'Hitter': hitter_list})
