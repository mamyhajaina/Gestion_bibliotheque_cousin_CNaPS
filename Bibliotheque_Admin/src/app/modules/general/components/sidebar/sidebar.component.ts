import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/AdminBibiliotheque/enregistrementOuvrage',
    title: 'Enregidtrement Des Ouvrages',
    icon: 'education_agenda-bookmark',
    class: '',
  },
  {
    path: '/AdminBibiliotheque/Demande_client',
    title: 'RECEPTION DE LA DEMANDE ',
    icon: 'education_agenda-bookmark',
    class: '',
  },
  {
    path: '/AdminBibiliotheque/statistique',
    title: 'ETATS et STATISTIQUES',
    icon: 'education_agenda-bookmark',
    class: '',
  },
  {
    path: '/AdminBibiliotheque/catlogue',
    title: 'Consultation catalogue',
    icon: 'education_agenda-bookmark',
    class: '',
  },
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  config: any;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    this.httpClient
      .get<any>('/assets/config.json', { headers })
      .subscribe((config) => {
        this.config = config;
      });
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
