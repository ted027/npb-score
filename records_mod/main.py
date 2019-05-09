from records import write_y_records
from npb import update_pitcher_y_records, update_hitter_y_records
from league import write_league_records
from sabr import add_sabr_pitcher, add_sabr_hitter

if __name__ == "__main__":
    write_y_records()
    update_pitcher_y_records()
    update_hitter_y_records()
    write_league_records()
    add_sabr_pitcher()
    add_sabr_hitter()
