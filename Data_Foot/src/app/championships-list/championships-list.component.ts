import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionshipsListService } from '../championships-list.service';
import { ChampionshipInterface } from './shared/interfaces/championship.interface';




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
  constructor(private championshipsService: ChampionshipsListService) {}

  //teamVisibility: { [championshipId: number]: boolean } = {};

  ngOnInit(): void {
    this.championshipsService.loadChampionships().subscribe({
      next: (championships: ChampionshipInterface[]) => {
        this.championships = championships;
        console.log(this.championships)
        // Initialiser l'état de visibilité pour chaque championnat
        /*championships.forEach(championship => {
          this.teamVisibility[championship.id] = false;
        });*/
      },
      // pensez a rajouter l'erreur de l'observable
    });
  }


}





