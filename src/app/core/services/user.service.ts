import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../user';
import { ServerToken } from '../models/server-token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtHelper: JwtHelperService) {
    console.log('new userService instance');
  }

  get user(): User | null {
    return this.token ? this.token.user || null : null;
  }

  isLoggedIn(): boolean {
    return !!(this.rawToken && this.user && !this.jwtHelper.isTokenExpired(this.rawToken));
  }

  private get rawToken(): string | null {
    return localStorage.getItem('token');
  }

  private get token(): ServerToken | null {
    try {
      return this.jwtHelper.decodeToken(this.rawToken);
    }
    catch {
      return null;
    }
  }
}