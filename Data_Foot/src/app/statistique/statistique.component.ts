import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiqueService } from '../statistique.service';
import { SelectionProperties } from '../championships-list/shared/interfaces/selection.interface';
import { GraphiqueComponent } from '../graphique/graphique.component';
import { Graphique2Component } from '../graphique-2/graphique-2.component';
import { Graphique3Component } from '../graphique-3/graphique-3.component';



@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
  imports:[Graphique3Component, Graphique2Component, GraphiqueComponent, CommonModule],
  standalone:true
})
export class StatistiqueComponent implements AfterViewInit {
  @ViewChild('div1') div1!: ElementRef;
  @ViewChild('div2') div2!: ElementRef;
  @ViewChild('div3') div3!: ElementRef;
  @ViewChild('div4') div4!: ElementRef;

  @ViewChild('stat1') stat1!: ElementRef;
  @ViewChild('stat2') stat2!: ElementRef;
  @ViewChild('stat3') stat3!: ElementRef;

  selectedPeriode: string = '';
  selectedStatistique: string = '';
  selectedPeriodeStates: boolean[] = [false, false, false, false]; // Un élément par division période
  selectedStatStates: boolean[] = [false, false, false]; // Un élément par division statistique
  selectedPeriodeValue: string = '';
  selectedStatistiqueValue : string ='';
  selectedClub : string='';



  isSelected: SelectionProperties = new SelectionProperties();

  constructor(
    private statistiqueService: StatistiqueService,
  
    ) {}

  ngAfterViewInit() {
    this.setupClickObservables();

  }

  setupClickObservables() {

    //souscription sur les observable des periodes
    this.statistiqueService.getClickObservable(this.div1).subscribe(() => this.selectionChanged('Période', 'Dernier match', 0, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div2).subscribe(() => this.selectionChanged('Période', 'Dernier mois', 1, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div3).subscribe(() => this.selectionChanged('Période', 'Dernier six mois', 2, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div4).subscribe(() => this.selectionChanged('Période', 'Derniere saison', 3, 'selectedPeriodeStates'));

    //souscription sur les observable des statistiques
    this.statistiqueService.getClickObservable(this.stat1).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués', 0, 'selectedStatStates'));
    this.statistiqueService.getClickObservable(this.stat2).subscribe(() => this.selectionChanged('Statistique', 'Ratio Victoires / Défaites', 1, 'selectedStatStates'));
    this.statistiqueService.getClickObservable(this.stat3).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués par joueur', 2, 'selectedStatStates'));


  }

  //fonction qui changent l'état des périodes et statistiques et récupère leurs valeurs
  selectionChanged(type: string, value: string, index: number, statesArray: 'selectedPeriodeStates' | 'selectedStatStates') {
    if (type === 'Période') {
      this.selectedPeriode = value;
      // Réinitialiser les états des autres #div
      this.selectedPeriodeStates = this.selectedPeriodeStates.map((_, i) => i === index);
      this.selectedPeriodeValue = this.selectedPeriode;
    } else if (type === 'Statistique') {
      this.selectedStatistique = value;
      // Réinitialiser les états des autres #stat
      this.selectedStatStates = this.selectedStatStates.map((_, i) => i === index);
      this.selectedStatistiqueValue = this.selectedStatistique;
    }
    // this.periode.nativeElement.innerHTML=this.selectedPeriode;
    console.log(this.selectedPeriode)
    console.log('Période sélectionnée:', this.selectedPeriode , 'Statistique sélectionnée:', this.selectedStatistique);

  }



}
