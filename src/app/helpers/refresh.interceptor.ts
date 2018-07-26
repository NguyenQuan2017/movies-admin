import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
    constructor (private token: TokenService ) {}
    setHeader(req) {

        const authToken = this.token.getToken();

        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });

        return authReq;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const InterceptorSkipHeader = 'X-Skip-Interceptor';

        if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
        }
        if (this.token.getToken() && this.token.isTokenExpired()) {
            console.log(this.token.isTokenExpired());
            const result = this.token.refreshToken();
            const ar = this.setHeader(result);
            return next.handle(ar);
        }

        const authReq = this.setHeader(req);
        return next.handle(authReq);
    }

}