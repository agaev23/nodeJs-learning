import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotesPageComponent } from './components/notes-page/notes-page.component';
import { AuthGuard } from './services/auth.guard';
import { PasswordPageComponent } from './components/password-page/password-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'notes', component: NotesPageComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard] },
    { path: 'changePassword', component: PasswordPageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
