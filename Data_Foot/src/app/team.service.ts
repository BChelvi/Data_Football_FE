//service qui update les infos selectionnées : club, periode et statistique et effectue les requêtes http

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,combineLatest,map,switchMap, catchError, throwError,tap,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamInfoSubject = new BehaviorSubject<{ id: string; name: string }>({ id: '', name: '' });
  private statSubject = new BehaviorSubject<{ statistique: string; periode: string }>({ statistique: '', periode: '' });


  private paramSubject = new BehaviorSubject<{ club: string, statistique: string; periode: string }>({ club:'',statistique: '', periode: '' });

  //on combine les deux subjects
  constructor(private http:HttpClient) {
    combineLatest([this.teamInfoSubject, this.statSubject])
      .pipe(
        map(([teamInfo, statInfo]) => ({
          club: teamInfo.name,
          statistique: statInfo.statistique,
          periode: statInfo.periode
        })),
        //on appelle la méthode qui envoie la requête http
        // switchMap(params => this.getDataFromApi(params))
        // catchError(_ => of('no more requests!!!'))       
      )
      .subscribe((combinedData) => {
        this.paramSubject.next(combinedData);
      });
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

  //methode pour la requête http
  private getDataFromApi(params: { club: string, statistique: string; periode: string }): Observable<any> {
    
    const url = `your/api/endpoint?club=${params.club}&statistique=${params.statistique}&periode=${params.periode}`;

    return this.http.get(url);
  }

  

}