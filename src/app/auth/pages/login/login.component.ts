import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  userImages: string[] = [
    '/images/user1.jpg',
    '/images/user2.jpg',
    '/images/user3.jpg',
    '/images/user4.jpg',
  ];
  loginService = inject(LoginService);
  myForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  successMessage = '';
  failMessage = '';

  onSubmit() {
    this.successMessage = '';
    this.failMessage = '';
    this.loginService.signIn(this.myForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        localStorage.setItem(
          'userImage',
          this.userImages[Math.floor(Math.random() * this.userImages.length)]
        );
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['main/home']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.failMessage = error.error.message;
      },
    });
  }
}
