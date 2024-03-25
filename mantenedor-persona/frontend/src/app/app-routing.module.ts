import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditagreComponent } from './components/editagre/editagre.component';

const routes: Routes = [
  {path: '', redirectTo:  'home', pathMatch:'full'},
  { path: 'home',component: HomeComponent},
  { path: 'add', component: EditagreComponent},
  { path: 'edit/:id', component: EditagreComponent},
  {path: '**', redirectTo:  'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
