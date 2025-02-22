import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../services/resetPassword/reset-password.service';
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  token!: string;
  resetPasswordService = inject(ResetPasswordService);
  myForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
  });

  successMessage = '';
  failMessage = '';

  onSubmit() {
    console.log(this.myForm.value);
    this.successMessage = '';
    this.failMessage = '';
    this.resetPasswordService.resetPassword(this.myForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Password reset successfully';
        this.token = response.token;
        // localStorage.setItem('token', this.token);
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        this.failMessage = error.error.message;
      },
    });
  }
}
