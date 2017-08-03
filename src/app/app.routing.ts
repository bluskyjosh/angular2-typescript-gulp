import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UserListComponent } from './user/index';
import { AuthGuard, NavGuard } from './_guards/index';

const appRoutes: Routes = [
    //Authenticated Routes
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard, NavGuard] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard, NavGuard] },

    //public routes
    { path: 'login', component: LoginComponent, canActivate: [NavGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NavGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
