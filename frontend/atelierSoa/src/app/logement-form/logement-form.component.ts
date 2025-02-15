import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogementService } from '../services/logement.service';

@Component({
  selector: 'app-logement-form',
  templateUrl: './logement-form.component.html',
})
export class LogementFormComponent implements OnInit {
  logement: any = {
    reference: null,
    adresse: '',
    delegation: '',
    gouvernorat: '',
    type: '',
    description: '',
    prix: null
  };
  isEditMode = false;

  constructor(
    private logementService: LogementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.logementService.getLogementById(+id).subscribe(
        (data) => {
          this.logement = data;
        },
        (error) => {
          console.error('Erreur lors du chargement du logement', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (!this.logement.reference || !this.logement.adresse || !this.logement.delegation || 
        !this.logement.gouvernorat || !this.logement.type || !this.logement.description || !this.logement.prix) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (this.isEditMode) {
      this.logementService.updateLogement(this.logement.id, this.logement).subscribe(
        () => {
          alert('Logement mis à jour avec succès !');
          this.router.navigate(['/logements']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du logement', error);
          alert('Erreur lors de la mise à jour');
        }
      );
    } else {
      this.logementService.addLogement(this.logement).subscribe(
        () => {
          alert('Logement ajouté avec succès !');
          this.router.navigate(['/logements']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du logement', error);
          alert('Erreur lors de l\'ajout');
        }
      );
    }
  }
}
