import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './pages/users/user/user.component';
import {LoginComponent} from './pages/login/login.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard],
        children: [
            { path: 'users', component: UserComponent},
        ]
    },

    { path: 'login', component: LoginComponent,  },
    { path: '**', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
