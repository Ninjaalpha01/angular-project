import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  register(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let user of users) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }
}
