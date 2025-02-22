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
  loginService = inject(LoginService);
  myForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  successMessage = '';
  failMessage = '';

  onSubmit() {
    console.log(this.myForm.value);
    this.successMessage = '';
    this.failMessage = '';
    this.loginService.signIn(this.myForm.value).subscribe({
      next: (response) => {
        console.log(response);
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
