import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataServiceService } from '../data-service.service';
import { TeamService } from '../team.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-graphique',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graphique.component.html',
  styleUrl: './graphique.component.css'
})
export class GraphiqueComponent{
  graphDataGoals: any[] =[];
  paramsSubscription: any;
  selectedClub : string='';
  selectedPeriode : string = '';
  selectedStatistique : string= "";
  graphData: any;
  requete:any;

  datatest:any =[
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000,
          "min": 7000000,
          "max": 7600000
        },
        {
          "name": "2011",
          "value": 8940000,
          "min": 8840000,
          "max": 9300000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000,
          "min": 7800000,
          "max": 7950000
        },
        {
          "name": "2011",
          "value": 8270000,
          "min": 8170000,
          "max": 8300000
        }
      ]
    }
  ]

  private updateChart$: Subject<void> = new Subject<void>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataServiceService,
    private teamService: TeamService
    ) {
      this.selectedPeriode = 'Dernière Saison';
      this.selectedStatistique = 'Buts marqués';
    }

  ngOnInit(
    
  ) {
  }

  //on souscript après la vue des composants créée
  ngAfterViewInit() {
    this.setupParamsSubscription();
    this.subscribeToUpdateChart();

  }

  //souscription à l'observable des paramètres selectionnés
  setupParamsSubscription() {
    this.paramsSubscription = this.teamService.getParamInfoObservable().subscribe({
      next: (params: { club: string, statistique: string; periode: string }) => {
        this.requete = params;
        this.graphData =this.requete.results;
        this.selectedClub = this.graphData[0].club.name
        if (this.graphData && this.graphData.length > 0) {
          this.transformData(this.graphData);
          this.updateChart$.next();
        } else {
          console.error('Les données simulées sont vides ou non définies.');
        }

      },
    });
  }

  //lifecycle end
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    this.ngUnsubscribe.next();
  }

  transformData(data: any) {
    this.graphDataGoals = [{ name: 'buts', series: [] }]; // Créez un tableau contenant un objet avec une clé "name"
    let series: any[] = [];
    for (const item of data) {
        series.push({ name: item.game.date, value: item.own_goals,min:"0",max:"10" });
    }
    this.graphDataGoals[0].series = series; // Affectez le tableau series à la clé "series" du premier objet dans graphDataGoals
    this.updateChart$.next();
  }

  subscribeToUpdateChart() {
    this.updateChart$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        // Mettez à jour le graphique ici
        this.graphDataGoals = [...this.graphDataGoals];
        console.log(this.graphDataGoals);
      });
  }

  // updateChart() {
  //   console.log(this.graphDataGoals);
  //   this.updateChart$.next();
  // }

}
