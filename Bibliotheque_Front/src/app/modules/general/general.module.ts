import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import  { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneralComponent,
    DocumentationComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [CommonModule, GeneralRoutingModule, FormsModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class GeneralModule {}
