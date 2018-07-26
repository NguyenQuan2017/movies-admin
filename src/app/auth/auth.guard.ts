import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private tokenService: TokenService) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (!this.tokenService.isTokenExpired()) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.tokenService.removeToken();
        return false;
    }
}
