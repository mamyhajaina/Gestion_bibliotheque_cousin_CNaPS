import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

constructor(
  private http: HttpClient
) { }

calculeDate(id: any){
  return this.http.get(`${environment.Local}demande/calcul_date?idmvt=${id}`);
}

delete(body: any){
  return this.http.post(`${environment.Local}mouvement/delete`,body);
}

}
