import requests
import bs4
import json

def startArray(soup):
    starts = []
    raw_starts = soup.select('.teams .yjSt')
    for raw_info in raw_starts:
        info = raw_info.text
        if info != '予告先発' and info != '戦評':
            starts.append(info)
    return starts

def inningArray(soup):
    innings = []
    raw_innings = soup.select('.teams .yjMSt')
    for raw_inning in raw_innings:
        inning = raw_inning.text
        inning = inning.replace("回", "")
        inning = inning.replace("表", "t")
        inning = inning.replace("裏", "b")
        inning = inning.replace("試合前", "yet")
        inning = inning.replace("結果", "end")
        inning = inning.replace("中止", "stop")
        innings.append(inning)
    return innings

def teamArray(soup):
    teams = []
    team_alp = {
        '広島': 'C',
        '阪神': 'T',
        'DeNA': 'DB',
        '巨人': 'G',
        '中日': 'D',
        'ヤクルト': 'YS',
        'ソフトバンク': 'H',
        '西武': 'L',
        '楽天': 'E',
        'オリックス': 'Bs',
        'ロッテ': 'M',
        '日本ハム': 'F',
    }
    raw_teams = soup.select('.teams .yjMS')
    for raw_team in raw_teams:
        alp = team_alp[raw_team.text]
        teams.append(alp)
    return teams

def scoreArray(soup):
    scores = []
    raw_scores = soup.select('.teams .score_r')
    for raw_score in raw_scores:
        scores.append(raw_score.text)
    return scores

def liveScores():
    
    url = 'http://baseball.yahoo.co.jp/npb/schedule/'
    res = requests.get(url)
    res.raise_for_status()

    soup = bs4.BeautifulSoup(res.text, "html.parser")

    games = len(soup.select('.teams'))
    starts = startArray(soup)
    innings = inningArray(soup)
    teams = teamArray(soup)
    scores = scoreArray(soup)

    output = []
    for i in range(games):
        game_score = {
            'info': {
                'start': starts[i],
                'inning': innings[i]
            },
            'home': {
                'team': teams[i*2+1],
                'score': scores[i*2+1]
            },
            'away': {
                'team': teams[i*2],
                'score': scores[i*2]
            }
        }
        output.append(game_score)

    return json.dumps(output)