import { RechercheComponent } from './pages/Recherche/Recherche.component';
import { Editeur_AjoutComponent } from './pages/Editeur_Ajout/Editeur_Ajout.component';
import { Auteur_ajoutComponent } from './pages/Auteur_ajout/Auteur_ajout.component';
import { DemandeComponent } from './pages/Demande/Demande.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBibiliothequeRoutingModule } from './admin-bibiliotheque-routing.module';
import { AdminBibiliothequeComponent } from './admin-bibiliotheque.component';
import { EnregistrementOuvrageComponent } from './pages/enregistrement-ouvrage/enregistrement-ouvrage.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminBibiliothequeComponent,
    EnregistrementOuvrageComponent,
    DemandeComponent,
    Auteur_ajoutComponent,
    Editeur_AjoutComponent,
    RechercheComponent
  ],
  imports: [
    CommonModule,
    AdminBibiliothequeRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ]
})
export class AdminBibiliothequeModule { }
