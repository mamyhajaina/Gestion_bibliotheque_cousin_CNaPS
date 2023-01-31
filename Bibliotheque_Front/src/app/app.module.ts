import { CatalogueService } from './modules/bibliotheque/services/catalogue.service';
import { FormsModule } from '@angular/forms';
import { BibliothequeModule } from './modules/bibliotheque/bibliotheque.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralModule } from './modules/general/general.module';
import { ToastrModule } from 'ngx-toastr';
import { ApiInterceptor } from './modules/general/interceptors/api.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GeneralModule,
    BibliothequeModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert',
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    CatalogueService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
