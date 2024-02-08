//service qui update les infos selectionnées : club, periode et statistique et effectue les requêtes http

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,combineLatest,map,switchMap, catchError, throwError,tap,of, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamInfoSubject = new BehaviorSubject<{ id: string; name: string }>({ id: '', name: '' });
  private statSubject = new BehaviorSubject<{ statistique: string; periode: string }>({ statistique: '', periode: '' });


  private paramSubject = new BehaviorSubject<{ club: string, statistique: string; periode: string }>({ club:'',statistique: '', periode: '' });
  public myobserbable : Observable<any>

  //on combine les deux subjects
  constructor(private http:HttpClient) {
    this.myobserbable =  combineLatest([this.teamInfoSubject, this.statSubject])
      .pipe(
        switchMap(([teamInfo, statInfo]) => {
          const combinedData = {
            club_id: teamInfo.id,
            club :teamInfo.name,
            statistique: statInfo.statistique,
            periode: statInfo.periode
          };
          const url = this.buildUrl(combinedData.club_id, combinedData.statistique, combinedData.periode);
          return this.getDataFromApi(url).pipe(
            map((dataFromApi) => ({ 
              ...dataFromApi, // on rajoute des propriété à la réponse
              selectedStatistique: combinedData.statistique, // Add the new property
              selectedClub: combinedData.club, // Add the new property
              selectedPeriode: combinedData.periode
            }))
          );
        }),
        shareReplay()//requete exécuté une seule fois
        
      )
      // .subscribe((data) => {
      //   // Faites ce que vous voulez avec les données récupérées de la requête HTTP
      //   this.paramSubject.next(data);
      // });


      const defaultTeamInfo = { id: '969', name: 'Montpellier' };
      this.updateTeamInfo(defaultTeamInfo);
  }

  getParamInfoObservable(): Observable<{ club: string, statistique: string; periode: string }> {
    return this.paramSubject.asObservable();
  }

  //Avec la combinaison nous n'avons plus besoin des deux observables
  // getTeamInfoObservable(): Observable<{ id: string; name: string }> {
  //   return this.teamInfoSubject.asObservable();
  // }

  // getStatInfoObservable(): Observable<{ statistique: string; periode: string }> {
  //   return this.statSubject.asObservable();
  // }

  //methode qui met à jour le club selectionné
  updateTeamInfo(teamInfo: { id: string; name: string }) {
    this.teamInfoSubject.next(teamInfo);
  }

  //methode qui met à jour la période et la statistique selectionnées
  updateStatsInfo(statsInfo: { statistique: string; periode: string }) {
    this.statSubject.next(statsInfo);
  }

   // Méthode pour construire l'URL de requête en fonction de la statistique/club et periode

    private buildUrl(club: string, statistique: string, periode: string): string {
      let endpoint = '';
      let time ='';
      // Sélectionnez dynamiquement l'endpoint en fonction de la statistique
      switch (statistique) {

        case 'Buts marqués':
          endpoint = `club_games/?club=${club}&${periode}`;
          break;

        case 'Ratio':
          endpoint = `club_games/?club=${club}&${periode}`;
          break;

        case 'Buts marqués par joueur':
          endpoint = `players/?current_club_id=${club}&${periode}`;
          break;

        default:
          endpoint = `club_games/?club=${club}&${periode}`;
      }
      return `http://localhost:8001/${endpoint}`;
      // http://localhost:8001/club_games/?club=105&season=2022
      // http://localhost:8001/club_games/?club=969&min_date=2023-06-01
      //http://localhost:8001/players/?current_club_id=105&min_date=2015-12-31&max_date=2017-01-01


    }


  //methode pour la requête http
  // Méthode pour la requête HTTP
  private getDataFromApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  

}