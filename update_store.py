import mysql.connector
from urllib.parse import urlparse
from scores import liveScores

url = urlparse('mysql://user:pass@localhost:3306/test')

conn = mysql.connector.connect(
    host = url.hostname or 'localhost',
    port = url.port or 3306,
    user = url.username or 'root',
    password = url.password or '',
    database = url.path[1:],
)

json_scores = liveScores()

# table全部deleteする→json書き込む(0~6rows)
cur = conn.cursor()

cur.execute('SELECT * FROM scores')
cur.fetchall()

try:
    cur.execute('UPDATE scores SET scores = json_scores')
    conn.commit()
except:
    conn.rollback()
    raise