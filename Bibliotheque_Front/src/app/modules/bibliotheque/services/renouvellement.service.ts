import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RenouvellementService {

constructor(
  private http: HttpClient
) { }

renouveller(data: any){
  return this.http.post(`${environment.Local}renouvellement/save`,data);
}

}
