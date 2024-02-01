import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChampionshipInterface } from './championships-list/shared/interfaces/championship.interface';
@Injectable({
  providedIn: 'root'
})
export class ChampionshipsListService {

  static url = 'http://localhost:8001/competitions/';

  constructor(private http: HttpClient) { }

  loadChampionships(): Observable<ChampionshipInterface[]> {
    return this.http.get<Array<ChampionshipInterface>>(ChampionshipsListService.url);
  }

}
