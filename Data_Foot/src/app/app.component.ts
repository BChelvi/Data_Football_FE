import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChampionshipsListComponent } from './championships-list/championships-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatistiqueComponent } from "./statistique/statistique.component";
import { GraphiqueComponent } from "./graphique/graphique.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ChampionshipsListComponent, NgxChartsModule, StatistiqueComponent, GraphiqueComponent]
})
export class AppComponent {
  title = 'Data_Foot';
}
