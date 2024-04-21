import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

const routes: Routes = [
  {path:'',
  component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:"full"},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'car',canActivate:[AuthGuard],component:CarComponent,title:'car'},
    {path:'cardetails/:id',canActivate:[AuthGuard],component:CarDetailsComponent},

  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:"full"},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:SignupComponent,title:'Register'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
