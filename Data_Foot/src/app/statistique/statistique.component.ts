import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiqueService } from '../statistique.service';
import { SelectionProperties } from '../championships-list/shared/interfaces/selection.interface';
import { GraphiqueComponent } from '../graphique/graphique.component';

import { TeamService } from '../team.service';




@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
  imports:[ GraphiqueComponent, CommonModule],
  standalone:true
})
export class StatistiqueComponent implements AfterViewInit {
  // @ViewChild('div1') div1!: ElementRef;
  @ViewChild('div2') div2!: ElementRef;
  @ViewChild('div3') div3!: ElementRef;
  @ViewChild('div4') div4!: ElementRef;

  @ViewChild('stat1') stat1!: ElementRef;
  @ViewChild('stat2') stat2!: ElementRef;
  @ViewChild('stat3') stat3!: ElementRef;

  selectedPeriode: string = 'season=2023';
  selectedStatistique: string = 'But marqués';
  selectedPeriodeStates: boolean[] = [false, false, false, true]; // Un élément par division période
  selectedStatStates: boolean[] = [true, false, false]; // Un élément par division statistique
  selectedPeriodeValue: string = '';
  selectedStatistiqueValue : string ='';
  // selectedClub : string='Montpellier Hérault Sport Club';



  isSelected: SelectionProperties = new SelectionProperties();

  constructor(
    private statistiqueService: StatistiqueService,
    private teamService: TeamService
    ) {


      this.selectedStatistique = 'Buts marqués'; // Par exemple, 'Ratio' comme valeur par défaut
      this.selectedPeriode = 'season=2022'; // Par exemple, 'Dernier mois' comme valeur par défaut
    }

    ngOnInit() {
      // Vous pouvez également appeler votre méthode de mise à jour ici pour envoyer les valeurs par défaut au service
      this.teamService.updateStatsInfo({ statistique: this.selectedStatistique, periode: this.selectedPeriode });
    }
  
  ngAfterViewInit() {
    this.setupClickObservables();

  }

  setupClickObservables() {

    //souscription sur les observable des periodes
    // this.statistiqueService.getClickObservable(this.div1).subscribe(() => this.selectionChanged('Période', 'Dernier match', 0, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div2).subscribe(() => this.selectionChanged('Période', 'min_date=2023-05-01&max_date=2023-06-30', 1, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div3).subscribe(() => this.selectionChanged('Période', 'min_date=2023-01-01&max_date=2023-06-30', 2, 'selectedPeriodeStates'));
    this.statistiqueService.getClickObservable(this.div4).subscribe(() => this.selectionChanged('Période', 'season=2022', 3, 'selectedPeriodeStates'));

    //souscription sur les observable des statistiques
    this.statistiqueService.getClickObservable(this.stat1).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués', 0, 'selectedStatStates'));
    this.statistiqueService.getClickObservable(this.stat2).subscribe(() => this.selectionChanged('Statistique', 'Ratio', 1, 'selectedStatStates'));
    this.statistiqueService.getClickObservable(this.stat3).subscribe(() => this.selectionChanged('Statistique', 'Buts marqués par joueur', 2, 'selectedStatStates'));


  }

  //fonction qui changent l'état des périodes et statistiques et récupère leurs valeurs puis les envoie au service
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

    //on envoie au service l'update des stats pour l'observable
    this.teamService.updateStatsInfo({ statistique: this.selectedStatistique, periode: this.selectedPeriode });

  }
}
