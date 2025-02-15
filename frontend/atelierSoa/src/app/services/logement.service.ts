import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogementService {
  private apiUrl = 'http://localhost:8080/LogementRendezVous_Etudiant_war/api/logement';  // URL du backend

  constructor(private http: HttpClient) {}

  // 🔍 Récupérer tous les logements
  getAllLogements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  // 🛠 Test pour voir les données brutes dans la console
  testEncoding(): void {
    this.http.get(`${this.apiUrl}/getAll`, { responseType: 'text' }).subscribe(data => {
      console.log("Données reçues :", data);
    });
  }

  // ➕ Ajouter un logement avec header
  addLogement(logement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/new`, logement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ✏️ Modifier un logement
  updateLogement(id: number, logement: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, logement, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // 🗑 Supprimer un logement
  deleteLogement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // 🔍 Récupérer un logement par ID
  getLogementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
