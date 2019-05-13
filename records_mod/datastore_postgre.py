import os
import json
import psycopg2
from psycopg2.extras import DictCursor
from psycopg2.extensions import AsIs


# DATABASE_URL = postgresql://{username}:{password}@{hostname}:{port}/{database}
# DATABASE_URL = postgresql://postgres:password@localhost:5432/postgres
def get_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)


def get_records(table_name):
    with get_connection() as conn:
        with conn.cursor(cursor_factory=DictCursor) as cur:
            cur.execute(f'SELECT * from {table_name}')
    records_list = []
    for row in cur:
        records_list.append(row)  # dict(row)?
    return records_list


def write_records(table_name, records_list):
    for record in records_list:
        columns = record.keys()
        values = [
            json.dumps(record[key])
            if isinstance(record[key], dict) else record[key]
            for key in record.keys()
        ]

        for value in values:
            if isinstance(value, dict):
                value = json.dumps(value)

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(f'insert into {table_name} (%s) values %s',
                            (AsIs(','.join(columns)), values))
