import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private http: HttpClient
  ) { }
  
  findall(){
    return this.http.get(`${environment.Local}bibliodocument/findallType`);
  }

}
