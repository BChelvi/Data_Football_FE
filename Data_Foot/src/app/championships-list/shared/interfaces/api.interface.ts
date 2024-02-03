import { ChampionshipInterface } from "./championship.interface";

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ChampionshipInterface[];
  }