import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { CommonModule } from '@angular/common';
import { GraphiqueComponent } from "../graphique/graphique.component";


@Component({
    selector: 'app-statistique',
    standalone: true,
    templateUrl: './statistique.component.html',
    styleUrl: './statistique.component.css',
    imports: [CommonModule, GraphiqueComponent]
})

export class StatistiqueComponent implements OnInit {
  stats: any;
  constructor(private DataServiceService: DataServiceService) {}

  ngOnInit(): void {
    /*this.DataServiceService.getStats().subscribe(
      (data) => {
        this.stats = data;
      },
      (error) => {
        console.error('Error fetching stats:', error);
      }
    );*/
  }
}

