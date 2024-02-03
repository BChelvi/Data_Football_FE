import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionshipsListComponent } from './championships-list/championships-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatistiqueComponent } from "./statistique/statistique.component";
import { GraphiqueComponent } from "./graphique/graphique.component";
import { TeamService } from './team.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ChampionshipsListComponent, NgxChartsModule, StatistiqueComponent, GraphiqueComponent]
})
export class AppComponent {

  constructor(private teamService: TeamService) {}

  title = 'Data_Foot';
  onClubClicked(event: { championshipId: string, clubName: string }): void {
    // Mettez à jour le service TeamService avec les informations sur le club sélectionné
    this.teamService.updateTeamInfo({ id: event.championshipId, name: event.clubName });
  }
}
