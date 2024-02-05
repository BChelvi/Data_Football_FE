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
      name: "Victoire",
      value: 60
    },
    {
      name: "Défaite",
      value: 40
    },

  ];

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  multiData = [
    // {
    // //   name: "Germany",
    // //   series: [
    // //     {
    // //       name: "1990",
    // //       value: 62000000
    // //     },
    // //     {
    // //       name: "2010",
    // //       value: 73000000
    // //     },
    // //     {
    // //       name: "2011",
    // //       value: 89400000
    // //     }
    // //   ]
    // // },
  
    {
      name: "USA",
      series: [
        {
          name: "24 fevrier",
          value: 1
        },
        {
          name: "30 mars",
          value: 3
        },
        {
          name: "15 avril",
          value: 4
        }
      ]
    },
  
    // {
    //   name: "France",
    //   series: [
    //     {
    //       name: "1990",
    //       value: 58000000
    //     },
    //     {
    //       name: "2010",
    //       value: 50000020
    //     },
    //     {
    //       name: "2011",
    //       value: 58000000
    //     }
    //   ]
    // },
    // {
    //   name: "UK",
    //   series: [
    //     {
    //       name: "1990",
    //       value: 57000000
    //     },
    //     {
    //       name: "2010",
    //       value: 62000000
    //     }
    //   ]
    // }
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
