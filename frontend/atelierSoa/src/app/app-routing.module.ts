import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogementListComponent } from './components/logement-list/logement-list.component';
import { LogementFormComponent } from './logement-form/logement-form.component';

const routes: Routes = [
  { path: 'logements', component: LogementListComponent },
  { path: 'logement/add', component: LogementFormComponent },
  { path: 'logement/edit/:id', component: LogementFormComponent },
  { path: '', redirectTo: '/logements', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
