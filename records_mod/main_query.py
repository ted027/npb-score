from records_detail import write_pitcher_records, write_hitter_records
from records_team import write_team_records
from npb import update_records_by_official

from multiprocessing import Process

if __name__ == "__main__":
    # parallel
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
