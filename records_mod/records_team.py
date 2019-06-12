import requests
import json
from bs4 import BeautifulSoup
from common import unify_teams
from records import request_soup, full_val, CENTRAL_LIST
from datastore_json import read_json, write_json

EXCEPT_HEAD_CONTENT = 1

URL = 'https://baseball.yahoo.co.jp/npb/standings/'


def records_by_team(table):
    team_list = []
    header = [th.text for th in table.find_all('th')][EXCEPT_HEAD_CONTENT:]
    body_tr = table.find_all('tr')[EXCEPT_HEAD_CONTENT:]
    for tr in body_tr:
        tds = tr.find_all('td')[EXCEPT_HEAD_CONTENT:]
        team = unify_teams(tds[0].text)
        records_by_team = {'チーム': team}
        if team in CENTRAL_LIST:
            records_by_team['League'] = 'Central'
        else:
            records_by_team['League'] = 'Pacific'
        body = [full_val(td.text) for td in tds[EXCEPT_HEAD_CONTENT:]]
        records_by_team.update(dict(zip(header, body)))
        team_list.append(records_by_team)
    return team_list


def append_team_array():
    team_list = []
    team_soup = request_soup(URL)
    # table_title_divs = team_soup.find_all('div', class_='p5')
    # table_titles = [div.text for div in table_title_divs]
    tables = team_soup.find_all('table')
    central_table = tables[0]
    pacific_table = tables[1]
    team_list = records_by_team(central_table)
    team_list.extend(records_by_team(pacific_table))
    return team_list


def write_team_records():
    team_list = append_team_array()

    write_json('teams.json', {'Team': team_list})
