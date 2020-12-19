from league import write_league_records
from add_sabr import add_sabr_pitcher, add_sabr_hitter
from team_by_park import update_team_park_records

if __name__ == "__main__":
    update_team_park_records()

    write_league_records()
    add_sabr_pitcher()
    add_sabr_hitter()
