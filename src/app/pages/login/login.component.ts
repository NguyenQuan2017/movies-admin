import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {AuthenticatedService} from '../../services/authenticated.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };
  returnUrl: string;
  public error = null;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private auth: AuthenticatedService,
      private tokenService: TokenService,
      private injector: Injector
  ) { }


  ngOnInit() {
      if (!this.tokenService.isTokenExpired()) {
        this.router.navigate(['/admin']);
      }
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    return this.auth.login(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.tokenService.handleToken(data.token);
      this.router.navigate([this.returnUrl]);
  }
  handleError(error) {
    this.error = error.error.error;
  }
}
