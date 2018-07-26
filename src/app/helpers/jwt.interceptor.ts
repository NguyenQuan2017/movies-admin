import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor (private tokenService: TokenService, private  router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const token = this.tokenService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(request).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
            }, (err: any) => {
                // if the token has expired.
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // this is where you can do anything like navigating
                        this.router.navigateByUrl('/login');
                    }
                }
            });
        }
        return next.handle(request);
    }
}