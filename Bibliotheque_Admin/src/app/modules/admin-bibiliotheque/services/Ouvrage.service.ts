import { Auteur_and_Ouvarge } from './../models/auteur_and_Ouvarge';
import { Auteur } from './../models/auteur';
import { Ouvrage } from './../models/ouvrage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuvrageService {

  constructor(
    private http: HttpClient
  ) { }

  saveOuvrage(body: Auteur_and_Ouvarge): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.post<any>(`${environment.Local}bibliodocument/save`, body );
  }

}
