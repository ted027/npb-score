import json
from sabr.common import RECORDS_DIRECTORY


def read_json(file_name):
    with open(f'{RECORDS_DIRECTORY}/{file_name}', 'r') as f:
        read_dic = json.load(f)
    return read_dic


def write_json(file_name, write_dic):
    with open(f'{RECORDS_DIRECTORY}/{file_name}', 'w') as f:
        json.dump(write_dic, f, indent=2, ensure_ascii=False)