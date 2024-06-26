import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  confirmPassword = '';
  errorMessage = '';
  user = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if (this.user.username && this.user.password) {
      this.authService.register({ username: this.user.username, password: this.user.password });
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Username and password are required';
    }
  }
}
