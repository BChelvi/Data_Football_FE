import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject,map } from 'rxjs';
import { ChampionshipInterface } from './championships-list/shared/interfaces/championship.interface';
import { ApiResponse } from './championships-list/shared/interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipsListService {

  static url = 'http://localhost:8001/competitions/';

  constructor(private http: HttpClient) { }

  loadChampionships(): Observable<ChampionshipInterface[]> {
    return this.http.get<ApiResponse>(ChampionshipsListService.url)
    .pipe(
      map(response => {
        // Filtrer les championnats avec des clubs non vides et last-season égale à 2023
        response.results = response.results
          .filter(championship => championship.clubs && championship.clubs.length > 0)
          .map(championship => {
            // Filtrer les clubs avec last_season égale à 2023
            championship.clubs = championship.clubs
              .filter((club: any) => club['last_season'] === 2023); 

            // Modifier le nom du championnat
            championship.name = this.transformChampionshipName(championship.name);
            return championship;
          });

        return response.results;
      })
    );
  }
  private transformChampionshipName(name: string): string {
    // Convertir la première lettre en majuscule et remplacer les "-" par des espaces
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  }

}
