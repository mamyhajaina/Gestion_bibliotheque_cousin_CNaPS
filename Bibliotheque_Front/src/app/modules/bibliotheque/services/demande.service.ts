import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

constructor(
  private http: HttpClient
) { }



finDetails(idMouveme: any){
  return this.http.get(`${environment.Local}demande/details_demande?idmvt=${idMouveme}`);
}
findDemandeEncoure(matricule: any){
  return this.http.get(`${environment.Local}demande/demande_en_cours?matricule=${matricule}`);
}

findDemandeValide(matricule: any){
  return this.http.get(`${environment.Local}demande/demande_valide?matricule=${matricule}`);
}

savedemande(dataSave: any){
  return this.http.post(`${environment.Local}mouvement/save`,dataSave);
}

historiquedemande(matricule: any){
  return this.http.get(`${environment.Local}mouvement/par_matricule?matricule=${matricule}`);
}


}
