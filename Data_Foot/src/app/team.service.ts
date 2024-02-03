import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamInfoSubject = new BehaviorSubject<{ id: string; name: string }>({ id: '', name: '' });

  getTeamInfoObservable(): Observable<{ id: string; name: string }> {
    return this.teamInfoSubject.asObservable();
  }

  updateTeamInfo(teamInfo: { id: string; name: string }) {
    this.teamInfoSubject.next(teamInfo);
  }
}