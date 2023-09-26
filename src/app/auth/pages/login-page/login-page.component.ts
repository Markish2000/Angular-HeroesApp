// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login('marcosparella2000@gmail.com', '123456')
      .subscribe((user) => this.router.navigate(['/']));
  }
}
