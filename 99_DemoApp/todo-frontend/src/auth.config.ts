import { AuthConfig } from 'angular-oauth2-oidc';

export function createAuthConfig(callbackUrl: string): AuthConfig {
  return {
    clientId: 'bif4spa',
    // Url of the Identity Provider
    issuer: 'http://localhost:5000',
    // The SPA's id. The SPA is registered with this id at the auth-server clientId: 'bif4ss2018ue5',
    redirectUri: callbackUrl,
    postLogoutRedirectUri: callbackUrl,
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile bif-api'
  };
}
