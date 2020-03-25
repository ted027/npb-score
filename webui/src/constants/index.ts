export type selectYears = "2019";
// export type selectYears = '2019' | '2020';

export interface YearsIf {
  anchorEl: HTMLDivElement | null;
  open: boolean;
  year_selected: selectYears;
}

export interface MainPageIf {
  selected: number;
  order_selected: number;
  league_selected: number;
  league: "CentralPacific" | "Central" | "Pacific" | "";
  searchTeam: string;
  searchName: string;
}

export interface SearchIf {
  anchorEl: HTMLDivElement | null;
  open: boolean;
  team: string;
  name: string;
}

export type strDict = { [key: string]: string };

export type strBoolDict = { [key: string]: string | boolean };

export type strBoolDictWithId = { [key: string]: string | boolean; id: string };
