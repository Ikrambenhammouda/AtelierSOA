import { Component, OnInit } from '@angular/core';
import { LogementService } from '../../services/logement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
})
export class LogementListComponent implements OnInit {
  logements: any[] = [];

  constructor(private logementService: LogementService, private router: Router) {}

  ngOnInit(): void {
    this.loadLogements();
  }

  loadLogements(): void {
    this.logementService.getAllLogements().subscribe(
      (data) => {
        this.logements = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des logements', error);
      }
    );
  }

  modifierLogement(id: number): void {
    this.router.navigate(['/logement/edit', id]);
  }

  supprimerLogement(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce logement ?')) {
      this.logementService.deleteLogement(id).subscribe(
        () => {
          console.log('Logement supprimé');
          this.loadLogements();
        },
        (error) => {
          console.error('Erreur lors de la suppression du logement', error);
        }
      );
    }
  }
}
