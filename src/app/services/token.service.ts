import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class TokenService {
    public currentToken: string;

    constructor( private  http: HttpClient) {}

    handleToken(token) {
        this.setToken(token);
        console.log(this.payload(token));
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    isValid() {
        const token = this.getToken();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return (payload.iss === 'http://movieserver.localhost:8081/api/admin/login') ? true : false;
            }
            return false;
        }
    }
    getToken() {
        return localStorage.getItem('token');
    }

    removeToken() {
        return localStorage.removeItem('token');
    }
    getTokenExpirationDate(token: string): Date {
        const exp = this.payload(token).exp;

        if (exp === undefined)  {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getToken();
        }
        if (!token)  {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }
    refreshToken(): Observable<any> {

        const token = this.getToken();
        const headers = new HttpHeaders();
        headers.set('Authorization', `Bearer ${token}`);
        return this.http.post('http://movieserver.localhost:8081/api/admin/refresh', { headers: headers });

    }

    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {
        return JSON.parse(atob(payload));
    }
}
