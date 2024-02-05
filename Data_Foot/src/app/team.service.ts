//service qui update les infos selectionnées : club, periode et statistique

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamInfoSubject = new BehaviorSubject<{ id: string; name: string }>({ id: '', name: '' });
  private statSubject = new BehaviorSubject<{ statistique: string; periode: string }>({ statistique: '', periode: '' });

  getTeamInfoObservable(): Observable<{ id: string; name: string }> {
    return this.teamInfoSubject.asObservable();
  }

  getStatInfoObservable(): Observable<{ statistique: string; periode: string }> {
    return this.statSubject.asObservable();
  }

  updateTeamInfo(teamInfo: { id: string; name: string }) {
    this.teamInfoSubject.next(teamInfo);
  }

  updateStatsInfo(statsInfo: { statistique: string; periode: string }) {
    this.statSubject.next(statsInfo);
  }


}