import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphiqueComponent } from "../graphique/graphique.component";
import { StatistiqueService } from '../statistique.service';


@Component({
    selector: 'app-statistique',
    standalone: true,
    templateUrl: './statistique.component.html',
    styleUrl: './statistique.component.css',
    imports: [CommonModule, GraphiqueComponent]
})

export class StatistiqueComponent implements AfterViewInit{
  @ViewChild('div1') div1!: ElementRef;
  @ViewChild('div2') div2!: ElementRef;
  @ViewChild('div3') div3!: ElementRef;
  @ViewChild('div4') div4!: ElementRef;

  constructor(private statistiqueService: StatistiqueService) {}

  ngAfterViewInit() {
    this.setupClickObservables();
  }

  setupClickObservables() {
    this.statistiqueService.getClickObservable(this.div1).subscribe(() => this.periode_selected('Dernier march'));
    this.statistiqueService.getClickObservable(this.div2).subscribe(() => this.periode_selected('Dernier mois'));
    this.statistiqueService.getClickObservable(this.div3).subscribe(() => this.periode_selected('Six derniers mois'));
    this.statistiqueService.getClickObservable(this.div4).subscribe(() => this.periode_selected('Saison en cours'));
  }

  periode_selected(nomPeriode: string) {
    console.log('Période sélectionnée:', nomPeriode);
  }
}
