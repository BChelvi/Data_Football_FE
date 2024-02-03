import { Component,Output,EventEmitter  } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ChampionshipsListService } from '../championships-list.service';
import { ChampionshipInterface } from './shared/interfaces/championship.interface';
import { TeamService } from '../team.service';



@Component({
  selector: 'app-championships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './championships-list.component.html',
  styleUrl: './championships-list.component.css',
})
export class ChampionshipsListComponent {

  
  championships: ChampionshipInterface[]=[];

  error: string = '';
    // Injection du service ChampionshipsService via le constructeur
  constructor(
    private championshipsService: ChampionshipsListService,
    private teamService: TeamService
    ) {}

  teamVisibility: { [championshipId: string]: boolean } = {};

  ngOnInit(): void {
    this.championshipsService.loadChampionships().subscribe({
      next: (championships: ChampionshipInterface[]) => {
        this.championships = championships;
        console.log(this.championships)
        // Initialiser l'état de visibilité pour chaque championnat
        championships.forEach(championship => {
          this.teamVisibility[championship.competition_id] = false;
        });
      },
      // pensez a rajouter l'erreur de l'observable
    });

  }

  updateTeamInfo() {
    const teamInfo = { id: '123', name: 'Nom de l\'équipe' };
    this.teamService.updateTeamInfo(teamInfo);
  }

  toggleTeamVisibility(championshipId: string): void {
    // Réinitialisez la visibilité de tous les autres championnats
    Object.keys(this.teamVisibility).forEach(id => {
      if (id !== championshipId) {
        this.teamVisibility[id] = false;
      }
    });

    // Basculez la visibilité du championnat actuel
    this.teamVisibility[championshipId] = !this.teamVisibility[championshipId];

  }

    // Ajoutez une méthode pour vérifier la visibilité des équipes
  isTeamVisible(championshipId: string): boolean {
    return this.teamVisibility[championshipId];
  }

  clubClicked(championshipId: string, clubId: string): void {
    this.teamService.updateTeamInfo({ id: championshipId, name: clubId });
  }


}





