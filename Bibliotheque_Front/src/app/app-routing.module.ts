import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './modules/general/guard/app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bibliotheque',
    pathMatch: 'full',
  },
  {
    path: 'bibliotheque',
    canActivate: [AppGuard],
    loadChildren: () =>
      import('./modules/bibliotheque/bibliotheque.module').then((m) => m.BibliothequeModule),
  },
  {
    path: 'general',
    canActivate: [AppGuard],
    loadChildren: () =>
      import('./modules/general/general.module').then((m) => m.GeneralModule),
  },
  {
    path: '**',
    redirectTo: 'bibliotheque',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
