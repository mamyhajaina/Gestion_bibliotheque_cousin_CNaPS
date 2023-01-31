import { DemandeComponent } from './pages/Demande/Demande.component';
import { CalogueDetailsItemComponent } from './components/calogueDetails-item/calogueDetails-item.component';
import { RechercheComponent } from './pages/Recherche/Recherche.component';
import { ConsultationCatalogueComponent } from './pages/consultationCatalogue/consultationCatalogue.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliothequeRoutingModule } from './bibliotheque-routing.module';
import { BibliothequeComponent } from './bibliotheque.component';
import { LivreComponent } from './pages/livre/livre.component';
import { TestComponent } from './pages/test/test.component';
import  { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfimationDemandeComponent } from './components/ConfimationDemande/ConfimationDemande.component';


@NgModule({
  declarations: [
    BibliothequeComponent,
    LivreComponent,
    ConsultationCatalogueComponent,
    TestComponent,
    RechercheComponent,
    CalogueDetailsItemComponent,
    DemandeComponent,
    ConfimationDemandeComponent
  ],
  imports: [
    CommonModule,
    BibliothequeRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ]
})
export class BibliothequeModule { }
