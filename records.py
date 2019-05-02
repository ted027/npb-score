import requests
import json
from bs4 import BeautifulSoup

BASEURL = 'https://baseball.yahoo.co.jp/'

NAME_HI = -1
TEAM_H1 = -2

EXCEPT_TITLE = 1
EXCEPT_TITLE_HEADER = 2

EXCEPT_HEAD_CONTENT = 1

CHANCE_STR_DIVIDER = 4

PITCHER_DUMP_VAL = 1
HITTER_DUMP_VAL = 2

TEAM_NUM_LIST = [376 if i == 10 else i for i in list(range(1, 13))]


def request_soup(url):
    res = requests.get(url)
    res.raise_for_status()
    return BeautifulSoup(res.content, "html.parser")


def link_tail_list(url):
    soup = request_soup(url)
    table = soup.find("table")
    td_player_list = table.find_all('td', class_='lt yjM')
    return [pl.find('a').get('href') for pl in td_player_list]


def basic_information(personal_soup):
    name = personal_soup.find_all('h1')[NAME_HI].text.split('（')[0]
    team = personal_soup.find_all('h1')[TEAM_H1].text
    return {'Name': name, 'Team': team}


def confirm_pitcher_tables(tables):
    """
    return basic and right/left records
    """
    records_table = rl_table = None
    for table in tables:
        table_type = table.find('tr').text.replace('\n', '')
        if table_type == '投手成績':
            records_table = table
        elif table_type == '左右打者別成績':
            rl_table = table
    return records_table, rl_table


def confirm_hitter_tables(tables):
    """
    return basic, chance, right/left, count, runner records
    """
    records_table = chance_table = rl_table = count_table = runner_table = None
    for table in tables:
        table_type = table.find('tr').text.replace('\n', '')
        if table_type == '打者成績':
            records_table = table
        elif table_type == '得点圏成績':
            chance_table = table
        elif table_type == '左右投手別成績':
            rl_table = table
        elif table_type == 'カウント別成績':
            count_table = table
        elif table_type == '塁状況別成績':
            runner_table = table
    return records_table, chance_table, rl_table, count_table, runner_table


def dict_records(records_table):
    rheader = [th.text for th in records_table.find_all('th')[EXCEPT_TITLE:]]
    rbody = [td.text for td in records_table.find_all('td')]
    return dict(zip(rheader, rbody))


def chance_records(chance_table):
    chheader_raw = [th.text for th in chance_table.find_all('th')]
    # [0][:4]'得点圏' + header値
    # [1:] remove table title
    chheader = [chheader_raw[0][:CHANCE_STR_DIVIDER] + h for h in chheader_raw[EXCEPT_HEAD_CONTENT:]]

    chbody = [td.text for td in chance_table.find_all('td')]
    return dict(zip(chheader, chbody))


def records_by_rl(rl_table, dump_val):
    """
    dump_val: remove top contentof
            pitcher: 1 ('打者')
            hitter: 2 ('投手', '打席')
    """
    rl_header = [th.text for th in rl_table.find_all('th')][dump_val:]

    rl_trs = rl_table.find_all('tr')[EXCEPT_TITLE_HEADER:]
    rl_records = {}
    for rl_tr in rl_trs:
        rl_body = [td.text for td in rl_tr.find_all('td')]
        if '右' in rl_body[0]:
            rl_records['対右'] = dict(zip(rl_header, rl_body[dump_val:]))
        elif '左' in rl_body[0]:
            rl_records['対左'] = dict(zip(rl_header, rl_body[dump_val:]))

    return rl_records


def records_by_count_or_runner(table_by):
    # [1:] remove header content 'カウント/ランナー'
    header = [th.text for th in table_by.find_all('th')][EXCEPT_HEAD_CONTENT:]

    # [2:] remove title and header row
    body_tr = table_by.find_all('tr')[EXCEPT_TITLE_HEADER:]
    records_by_count_or_runner = {}
    for tr in body_tr:
        body = [td.text for td in tr.find_all('td')]
        records_by_count_or_runner[body[0]] = dict(zip(header, body[EXCEPT_HEAD_CONTENT:]))
    return records_by_count_or_runner


def append_team_pitcher_array(link_tail_list):
    team_pitcher_list = []
    for ptail in link_tail_list:
        # personal id
        # [-1] is null
        # personal_id = ptail.split('/')[-2]

        personal_link = BASEURL + ptail
        personal_soup = request_soup(personal_link)

        personal_dict = basic_information(personal_soup)
        # personal_dict['ID'] = personal_id

        tables = personal_soup.find_all('table')
        records_table, rl_table = confirm_pitcher_tables(tables)
        # 0: profile
        # 1: **pitch records
        # (2): hit records
        # (3): chance records
        # 4: *recent records
        # 5/(6): *records by teams central/pacific
        # -4: monthly records
        # -3: **left/right
        # -2: field
        # -1: open

        records = dict_records(records_table)

        if rl_table:
            # 1: dump '○打'
            records_rl = records_by_rl(rl_table, PITCHER_DUMP_VAL)
            records.update(records_rl)

        personal_dict['Records'] = records

        team_pitcher_list.append(personal_dict)

    return team_pitcher_list


def append_team_hitter_array(link_tail_list):
    team_hitter_list = []
    for htail in link_tail_list:
        # personal id
        # [-1] is null
        # personal_id = ptail.split('/')[-2]
        personal_link = BASEURL + htail
        personal_soup = request_soup(personal_link)

        personal_dict = basic_information(personal_soup)
        # personal_dict['ID'] = personal_id

        tables = personal_soup.find_all('table')
        records_table, chance_table, rl_table, count_table, runner_table = confirm_hitter_tables(tables)
        # 0: profile
        # 1: **records
        # (2): **chance
        # 3: *recent records
        # 4/(5): *records by teams central/pacific
        # 6: monthly records
        # 7: **left/right
        # 8: **count
        # 9: **runner
        # 10: field
        # -1: open

        records = dict_records(records_table)

        if chance_table:
            ch_records = chance_records(chance_table)
            records.update(ch_records)

        if rl_table:
            # 2: dump '○投' | '○打席'
            records_rl = records_by_rl(rl_table, HITTER_DUMP_VAL)
            records.update(records_rl)

        if count_table:
            records_by_count = records_by_count_or_runner(count_table)
            records.update({'カウント': records_by_count})

        if runner_table:
            records_by_runner = records_by_count_or_runner(runner_table)
            records.update({'走者': records_by_runner})

        personal_dict['Records'] = records

        team_hitter_list.append(personal_dict)

    return team_hitter_list


def append_records_array():
    pitcher_list = []
    hitter_list = []
    for i in TEAM_NUM_LIST:

        purl = BASEURL + 'npb/teams/' + str(i) + '/memberlist?type=p'
        hurl = BASEURL + 'npb/teams/' + str(i) + '/memberlist?type=b'

        pit_link_tail_list = link_tail_list(purl)
        hit_link_tail_list = link_tail_list(hurl)

        team_pitcher_list = append_team_pitcher_array(pit_link_tail_list)
        pitcher_list.extend(team_pitcher_list)

        team_hitter_list = append_team_hitter_array(hit_link_tail_list)
        hitter_list.extend(team_hitter_list)

    return pitcher_list, hitter_list


pitcher_list, hitter_list = append_records_array()

with open('pitchers.json', 'w') as pf:
    json.dump({'Pitcher': pitcher_list}, pf, indent=2, ensure_ascii=False)

with open('hitters.json', 'w') as hf:
    json.dump({'Hitter': hitter_list}, hf, indent=2, ensure_ascii=False)
