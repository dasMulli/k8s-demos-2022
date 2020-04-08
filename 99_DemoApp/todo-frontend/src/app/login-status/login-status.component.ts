import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit, OnDestroy {

  public isLoggedIn = false;

  public userName: string;
  public userEmail: string;

  private authSubscription: Subscription;
  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private oAuthService: OAuthService) { }

  ngOnInit() {
    this.authSubscription = this.oAuthService.events.subscribe(() => this.updateStatus());
    this.updateStatus();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateStatus() {
    this.isLoggedIn = this.oAuthService.hasValidAccessToken();

    if (this.isLoggedIn) {
      const token = this.oAuthService.getAccessToken();
      const decodedToken = this.jwtHelperService.decodeToken(token);
      this.userName = decodedToken.name;
      this.userEmail = decodedToken.email;
    } else {
      this.userName = null;
      this.userEmail = null;
    }
  }

  public logIn() {
    this.oAuthService.initImplicitFlow();
  }

  public logOut() {
    this.oAuthService.logOut();
  }

}
