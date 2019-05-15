import os
import json
import copy
import psycopg2
from psycopg2.extras import DictCursor
from psycopg2.extensions import AsIs


# DATABASE_URL = postgresql://{username}:{password}@{hostname}:{port}/{database}
# DATABASE_URL = postgresql://postgres:password@localhost:5432/postgres
def get_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)


def read_records(table_name):
    with get_connection() as conn:
        with conn.cursor(cursor_factory=DictCursor) as cur:
            cur.execute(f'SELECT * from {table_name}')
    records_list = []
    for row in cur:
        records_list.append(row)  # dict(row)?
    return records_list


def get_key_value_tuple(records):
    columns = records.keys()
    values = [
        json.dumps(records[key])
        if isinstance(records[key], dict) else records[key]
        for key in records.keys()
    ]
    return columns, tuple(values)


def write_records(table_name, records_list):
    for records in records_list:
        update_records = copy.deepcopy(records)

        del update_records['id']

        ins_columns, ins_values = get_key_value_tuple(records)
        upd_columns, upd_values = get_key_value_tuple(update_records)

        upsert_sql = f'''
            INSERT INTO {table_name} (%s)
                VALUES %s
                ON CONFLICT (id)
                DO UPDATE SET
                    (%s) = %s ;
        '''

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(upsert_sql,
                            (AsIs(','.join(ins_columns)), ins_values,
                             AsIs(','.join(upd_columns)), upd_values))
