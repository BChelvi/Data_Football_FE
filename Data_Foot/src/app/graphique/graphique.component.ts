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
  teamInfoSubscription: any;
  statInfoSubscription: any;
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

  //on souscript après la vue des composants crées
  ngAfterViewInit() {
    this.setupTeamInfoSubscription();
    this.setupStatInfoSubscription();
  }

  //souscription à l'observable du club selectionné
  setupTeamInfoSubscription() {
    this.teamInfoSubscription = this.teamService.getTeamInfoObservable().subscribe({
      next: (teamInfo: { id: string; name: string }) => {
        this.selectedClub = teamInfo.name;

        //on envoie au service les nouveaux paramètre
        this.dataService.getParams(this.selectedClub,this.selectedPeriode,this.selectedStatistique)
      },
    });
  }

  //souscription à l'observable de la periode et de la statistique selectionnées
  setupStatInfoSubscription() {
    this.statInfoSubscription = this.teamService.getStatInfoObservable().subscribe({
      next: (statsInfo: { statistique: string; periode: string }) => {
        this.selectedPeriode = statsInfo.periode;
        this.selectedStatistique = statsInfo.statistique;

        //on envoie au service les nouveaux paramètre
        this.dataService.getParams(this.selectedClub,this.selectedPeriode,this.selectedStatistique)

      },
    });
  }

  //lifecycle end
  ngOnDestroy(): void {
    if (this.teamInfoSubscription) {
      this.teamInfoSubscription.unsubscribe();
    }
    if (this.statInfoSubscription) {
      this.statInfoSubscription.unsubscribe();
    }
  }

}
