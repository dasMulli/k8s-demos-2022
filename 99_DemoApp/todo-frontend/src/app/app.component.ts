import { Component, OnInit, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { DOCUMENT } from '@angular/common';
import { createAuthConfig } from 'src/auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bifdemo';

  constructor(private oAuthService: OAuthService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const callback = `${this.document.location.protocol}//${document.location.hostname}:${document.location.port}/`;
    this.oAuthService.configure(createAuthConfig(callback));
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
}
