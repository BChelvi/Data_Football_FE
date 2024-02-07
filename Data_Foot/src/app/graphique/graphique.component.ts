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
  graphDataRatio : any[]=[];
  paramsSubscription: any;
  selectedClub : string='';
  selectedPeriode : string = '';
  selectedStatistique : string= "";
  graphData: any;
  requete:any;

  dataset:any=[
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ]



  private updateChart$: Subject<void> = new Subject<void>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private dataService: DataServiceService,
    private teamService: TeamService
    ) {
      this.selectedPeriode = 'season=2023';
      this.selectedStatistique = 'Buts marqués';
    }

  ngOnInit(
    
  ) {
  }

  //on souscript après la vue des composants créée
  ngAfterViewInit() {
    this.setupParamsSubscription();
    // this.subscribeToUpdateChart();

  }

  //souscription à l'observable des paramètres selectionnés
  setupParamsSubscription() {
    this.paramsSubscription = this.teamService.myobserbable.subscribe({
      next: (params: { club: string, statistique: string; periode: string }) => {
        this.requete = params;
        this.selectedStatistique=this.requete.selectedStatistique
        this.selectedClub =this.requete.selectedClub

        //on verifie qu'on recupère bien de la data par la requete
        if(this.requete.results){
          this.graphData =this.requete.results;
          //on verifie que la data existe et n'est pas vide
          if (this.graphData && this.graphData.length > 0) {
            switch (this.selectedStatistique) {
              // si la statitique selectionné est Buts marqué
              case 'Buts marqués':
                // on verifie que l'observable retourne bien les resultats de la requete http
                this.transformDataGoals(this.graphData);
                break;
              //si la statistique selectionnée est Ratio
              case 'Ratio':
                this.transformDataRatio(this.graphData);                
                break;
              // si la statistique selectionnée est but maqués
              case 'Buts marqués par joueurs':
                
                break;
              // Ajoutez d'autres cas pour chaque statistique
              default:
                break;
              }
          }
          else {
            console.error('Les données simulées sont vides ou non définies.');
          }
        }
        else {
          console.error('La requête ne possède pas de données');
        }
      }
    });
  }

  //lifecycle end
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    this.ngUnsubscribe.next();
  }

  //methode pour transformer les data pour afficher le Ratio Victoire/défaite
  transformDataRatio(data: any) {
    this.graphDataRatio = []; // On vide graphDataRatio
    let totalVictoire: number = 0;
    
    // On boucle sur les données pour compter les victoires
    for (const item of data) {
      if (item.is_win === 1) {
        totalVictoire += 1;
      }
    }
  
    // Création de l'objet pour les victoires
    const victoire = {
      name: "victoire",
      value: totalVictoire
    };
    this.graphDataRatio.push(victoire);
  
    // Création de l'objet pour les défaites
    const defeat = {
      name: "défaite",
      value: data.length - totalVictoire
    };
    this.graphDataRatio.push(defeat);
    // this.updateChart$.next();
  }

  //methode pour transformer les data pour afficher les buts marqués par l'équipe
  transformDataGoals(data: any) {
    this.graphDataGoals = [{ name: 'buts', series: [] }]; // Créez un tableau vide contenant un objet avec une clé "name"
    let series: any[] = [];
    for (const item of data) {
        series.push({ name: item.game.date, value: item.own_goals,min:"0",max:"10" });
    }
    this.graphDataGoals[0].series = series; // Affectez le tableau series à la clé "series" du premier objet dans graphDataGoals
    // this.updateChart$.next();
  }

  // //observable sur la modification des data
  // subscribeToUpdateChart() {
  //   console.log(this.graphDataRatio)
  //   this.updateChart$
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(() => {
  //       // Mettez à jour le graphique ici
  //       // this.graphDataGoals = [...this.graphDataGoals];
  //     });
  // }


}
