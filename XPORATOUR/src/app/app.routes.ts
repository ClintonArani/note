import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path: "",component:HomeComponent},
    {path: 'home',pathMatch: 'full', component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'admin', component: AdminDashboardComponent},
    {path: 'contact', component: ContactComponent}
];
