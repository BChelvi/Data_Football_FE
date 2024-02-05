//service qui gère l'envoie des requetes

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  //private apiUrl = 'your_backend_api_url';
  singleData = [
    {
      name: "Germany",
      value: 8940000
    },
    {
      name: "USA",
      value: 5000000
    },
    {
      name: "France",
      value: 7200000
    },
      {
      name: "UK",
      value: 6200000
    }
  ];

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  multiData = [
    {
      name: "Germany",
      series: [
        {
          name: "1990",
          value: 62000000
        },
        {
          name: "2010",
          value: 73000000
        },
        {
          name: "2011",
          value: 89400000
        }
      ]
    },
  
    {
      name: "USA",
      series: [
        {
          name: "1990",
          value: 250000000
        },
        {
          name: "2010",
          value: 309000000
        },
        {
          name: "2011",
          value: 311000000
        }
      ]
    },
  
    {
      name: "France",
      series: [
        {
          name: "1990",
          value: 58000000
        },
        {
          name: "2010",
          value: 50000020
        },
        {
          name: "2011",
          value: 58000000
        }
      ]
    },
    {
      name: "UK",
      series: [
        {
          name: "1990",
          value: 57000000
        },
        {
          name: "2010",
          value: 62000000
        }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  /*getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }*/

  getsaleData() {
    return this.saleData;
  }

  getmultiData() {
    return this.multiData;
  }
  getsingleData() {
    return this.singleData
  }

}
