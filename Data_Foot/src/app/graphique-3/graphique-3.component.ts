import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataServiceService } from '../data-service.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-graphique-3',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './graphique-3.component.html',
  styleUrl: './graphique-3.component.css'
})
export class Graphique3Component {
  singleData: any;
  teamInfoSubscription: any;
  selectedClub : string='';
  constructor(
    private dataService: DataServiceService,
    private teamService: TeamService
    ) {}

  ngOnInit() {
    this.singleData = this.dataService.getsingleData();
  }

  ngAfterViewInit() {
    // this.setupTeamInfoSubscription();
  }

  // setupTeamInfoSubscription() {
  //   this.teamInfoSubscription = this.teamService.getTeamInfoObservable().subscribe({
  //     next: (teamInfo: { id: string; name: string }) => {
  //       // Faites quelque chose avec les informations sur l'équipe
  //       console.log(`Championship ID: ${teamInfo.id}, Team Name: ${teamInfo.name}`);
  //       this.selectedClub = teamInfo.name;
  //     },
  //   });
  // }

  ngOnDestroy(): void {
    if (this.teamInfoSubscription) {
      this.teamInfoSubscription.unsubscribe();
    }
  }
}
