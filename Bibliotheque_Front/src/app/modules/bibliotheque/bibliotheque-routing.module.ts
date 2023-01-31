import { DemandeComponent } from './pages/Demande/Demande.component';
import { RechercheComponent } from './pages/Recherche/Recherche.component';
import { TestComponent } from './pages/test/test.component';
import { GeneralComponent } from './../general/general.component';
import { ConsultationCatalogueComponent } from './pages/consultationCatalogue/consultationCatalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreComponent } from './pages/livre/livre.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: 'catalogue',
        component: ConsultationCatalogueComponent
      },
      {
        path: '',
        redirectTo: 'catalogue',
        pathMatch: 'full',
      },
      {
        path: 'livre',
        component: LivreComponent
      },
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'recherche',
        component: RechercheComponent
      },
      {
        path: 'demande',
        component: DemandeComponent
      },
      { path: '**', redirectTo: 'catalogue' },
    ],
  },
  { path: '**', redirectTo: 'catalogue',pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliothequeRoutingModule { }
