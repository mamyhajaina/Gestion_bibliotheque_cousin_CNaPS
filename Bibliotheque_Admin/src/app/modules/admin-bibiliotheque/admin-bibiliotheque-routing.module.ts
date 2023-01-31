import { RechercheComponent } from './pages/Recherche/Recherche.component';
import { DemandeComponent } from './pages/Demande/Demande.component';
import { EnregistrementOuvrageComponent } from './pages/enregistrement-ouvrage/enregistrement-ouvrage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBibiliothequeComponent } from './admin-bibiliotheque.component';
import { GeneralComponent } from '../general/general.component';

const routes: Routes = [
  { 
    path: '', 
    component: GeneralComponent,
    children:
    [
      {
        path: 'enregistrementOuvrage',
        component: EnregistrementOuvrageComponent
      },
      {
        path: '',
        redirectTo: 'enregistrementOuvrage',
        pathMatch: 'full'
      },
      {
        path: 'Demande_client',
        component: DemandeComponent
      },
      {
        path: 'catlogue',
        component: RechercheComponent
      },
      { 
        path: '**', 
        redirectTo: 'enregistrementOuvrage' 
      },
    ]
  },
  { path: '**', redirectTo: 'enregistrementOuvrage' ,pathMatch: 'full',},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBibiliothequeRoutingModule { }
