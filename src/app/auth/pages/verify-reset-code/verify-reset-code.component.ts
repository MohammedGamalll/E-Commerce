import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ResetPasswordService } from '../../services/resetPassword/reset-password.service';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  resetPasswordService = inject(ResetPasswordService);
  loginService = inject(LoginService);
  myForm: FormGroup = this.fb.group({
    resetCode: [null, [Validators.required]],
  });

  successMessage = '';
  failMessage = '';

  onSubmit() {
    this.successMessage = '';
    this.failMessage = '';
    this.resetPasswordService.VerifyResetCode(this.myForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.status;
        setTimeout(() => {
          this.router.navigate(['resetPassword']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.failMessage = error.error.message;
      },
    });
  }
}
