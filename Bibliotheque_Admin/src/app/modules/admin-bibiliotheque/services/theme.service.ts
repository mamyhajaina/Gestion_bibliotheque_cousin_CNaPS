import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

constructor(
  private http: HttpClient
) { }

findallTheme(){
  return this.http.get(`${environment.Local}bibliodocument/findallTheme`);
}

}
