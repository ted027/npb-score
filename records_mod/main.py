from records import write_y_records
from npb import update_records_by_official
from league import write_league_records
from add_sabr import add_sabr_pitcher, add_sabr_hitter

if __name__ == "__main__":
    write_y_records()
    update_records_by_official()
    write_league_records()
    add_sabr_pitcher()
    add_sabr_hitter()
