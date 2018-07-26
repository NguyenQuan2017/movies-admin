import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable()
export  class  UserService {
    readonly  rootUrl = 'http://movieserver.localhost:8081/api/admin/';

    constructor(private  http: HttpClient, private token: TokenService) {
    }




    getAllUser() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token.getToken()
            })
        };
        return this.http.get(this.rootUrl + 'user', httpOptions);
    }
}
