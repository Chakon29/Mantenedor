import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditagreComponent } from './components/editagre/editagre.component';

const routes: Routes = [
  {path: '', redirectTo:  'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  { path: 'home',component: HomeComponent},
  { path: 'add', component: EditagreComponent},
  { path: 'edit/:id', component: EditagreComponent},
  {path: '**', redirectTo:  'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
