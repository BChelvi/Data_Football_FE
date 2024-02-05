import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataServiceService } from '../data-service.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-graphique',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graphique.component.html',
  styleUrl: './graphique.component.css'
})
export class GraphiqueComponent{
  saleData: any;
  paramsSubscription: any;
  selectedClub : string='';
  selectedPeriode : string = '';
  selectedStatistique : string= "";


  constructor(
    private dataService: DataServiceService,
    private teamService: TeamService
    ) {}

  ngOnInit() {
    this.saleData = this.dataService.getsaleData();
  }

  //on souscript après la vue des composants créée
  ngAfterViewInit() {
    this.setupParamsSubscription();
  }

  //souscription à l'observable des paramètres selectionnés
  setupParamsSubscription() {
    this.paramsSubscription = this.teamService.getParamInfoObservable().subscribe({
      next: (params: { club: string, statistique: string; periode: string }) => {
        this.selectedPeriode = params.periode;
        this.selectedStatistique = params.statistique;
        this.selectedClub = params.club;
      },
    });
  }

  //lifecycle end
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

  }

}
