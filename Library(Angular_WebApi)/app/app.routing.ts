import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './components/home.component';
//import { UserComponent } from './components/user.component';
import { BookComponent } from './components/book.component';
import { UserDtoComponent } from './components/userDTO.component';

const appRoutes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    //{ path: 'user', component: UserComponent },
    { path: '', redirectTo: 'book', pathMatch: 'full' },
    { path: 'book', component: BookComponent },
    { path: 'userDTO', component: UserDtoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);