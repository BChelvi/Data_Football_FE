import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  //private apiUrl = 'your_backend_api_url';

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  constructor(private http: HttpClient) {}

  /*getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }*/

  getsaleData() {
    return this.saleData;
  }
}
