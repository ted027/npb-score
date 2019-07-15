from records import write_pitcher_records, write_hitter_records
from records_team import write_team_records
from npb import update_records_by_official
from league import write_league_records
from add_sabr import add_sabr_pitcher, add_sabr_hitter
from team_by_park import update_team_park_records

from multiprocessing import Process


def para_records_func():
    write_pitcher_records()
    write_hitter_records()
    write_team_records()

if __name__ == "__main__":
    pitch_process = Process(target=write_pitcher_records)
    pitch_process.start()

    hit_process = Process(target=write_hitter_records)
    hit_process.start()

    team_process = Process(target=write_team_records)
    team_process.start()

    pitch_process.join()
    hit_process.join()
    team_process.join()

    update_records_by_official()
    update_team_park_records()
    write_league_records()
    add_sabr_pitcher()
    add_sabr_hitter()
