import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  constructor(
    private http: HttpClient
  ) { }

  findalls(){
    return this.http.get(`${environment.Local}auteur/fin_all`);
  }

}
