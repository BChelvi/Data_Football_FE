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

  ngAfterViewInit() {
    this.setupTeamInfoSubscription();
    this.setupStatInfoSubscription();
  }

  setupTeamInfoSubscription() {
    this.teamInfoSubscription = this.teamService.getTeamInfoObservable().subscribe({
      next: (teamInfo: { id: string; name: string }) => {
        // Faites quelque chose avec les informations sur l'équipe
        console.log(`Championship ID: ${teamInfo.id}, Team Name: ${teamInfo.name}`);
        this.selectedClub = teamInfo.name;
      },
    });
  }

  setupStatInfoSubscription() {
    this.statInfoSubscription = this.teamService.getStatInfoObservable().subscribe({
      next: (statsInfo: { statistique: string; periode: string }) => {
        // Faites quelque chose avec les informations sur l'équipe
        console.log(`Statistique: ${statsInfo.statistique}, Periode: ${statsInfo.periode}`);
        this.selectedPeriode = statsInfo.periode;
        this.selectedStatistique = statsInfo.statistique;
      },
    });
  }


  ngOnDestroy(): void {
    if (this.teamInfoSubscription) {
      this.teamInfoSubscription.unsubscribe();
    }
  }

}
