import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(
    private http: HttpClient
  ) { }

  recherche(themeValue: string, table: string,tableValue: string){
    return this.http.get(`${environment.Local}bibliodocument/recherche?themeValue=${themeValue}&table=${table}&tableValue=${tableValue}`);
  }

  findallCatalogueDetails(doc_cote: any){
    return this.http.get(`${environment.Local}bibliodocument/recherche_par_doc_cote?doc_cote=${doc_cote}`);
  }

  findallCatalogue(){
    return this.http.get(`${environment.Local}bibliodocument/findall`);
  }

  findallTheme(){
    return this.http.get(`${environment.Local}bibliodocument/findallTheme`);
  }
  findallColone(){
    return this.http.get(`${environment.Local}bibliodocument/liste_colonne`);
  }
}
