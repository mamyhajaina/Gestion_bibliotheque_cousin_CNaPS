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
    path: '/bibliotheque/catalogue',
    title: 'catalogue',
    icon: 'files_paper',
    class: '',
  },
  {
    path: '/bibliotheque/recherche',
    title: 'Recherche',
    icon: 'ui-1_zoom-bold',
    class: '',
  },
  {
    path: '/bibliotheque/demande',
    title: 'Historique Demande',
    icon: 'files_box',
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
