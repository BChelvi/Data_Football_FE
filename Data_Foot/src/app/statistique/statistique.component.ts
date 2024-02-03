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

  @ViewChild('stat1') stat1!: ElementRef;
  @ViewChild('stat2') stat2!: ElementRef;
  @ViewChild('stat3') stat3!: ElementRef;

  selectedPeriode: string = '';
  selectedStatistique: string = '';

  constructor(private statistiqueService: StatistiqueService) {}

  //on utilise afterview car le nativeElement @viewchild est un élément undefined au momment de l'acces avec onInit
  ngAfterViewInit() {
    this.setupClickObservables();
  }

  setupClickObservables() {
    // Observables pour les statistiques
    this.statistiqueService.getClickObservable(this.div1).subscribe(() => this.selectionChanged('Période', 'Dernier march'));
    this.statistiqueService.getClickObservable(this.div2).subscribe(() => this.selectionChanged('Période', 'Dernier mois'));
    this.statistiqueService.getClickObservable(this.div3).subscribe(() => this.selectionChanged('Période', 'Six derniers mois'));
    this.statistiqueService.getClickObservable(this.div4).subscribe(() => this.selectionChanged('Période', 'Saison en cours'));

    // Observables pour les periodes
    this.statistiqueService.getClickObservable(this.stat1).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués'));
    this.statistiqueService.getClickObservable(this.stat2).subscribe(() => this.selectionChanged('Statistique', 'Ratio Victoires / Défaites'));
    this.statistiqueService.getClickObservable(this.stat3).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués par joueur'));
  }

  //methode qui permet de voir la periode et la statistique actuellement selectionnées
  selectionChanged(type: string, value: string) {
    if (type === 'Période') {
      this.selectedPeriode = value;
    } else if (type === 'Statistique') {
      this.selectedStatistique = value;
    }

    console.log('Période sélectionnée:', this.selectedPeriode);
    console.log('Statistique sélectionnée:', this.selectedStatistique);
  }
}
