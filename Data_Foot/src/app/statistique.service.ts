import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  getClickObservable(element: ElementRef): Observable<Event> {
    return fromEvent(element.nativeElement, 'click');
  }
}