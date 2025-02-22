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
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  resetPasswordService = inject(ResetPasswordService);
  myForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
  });

  successMessage = '';
  failMessage = '';

  onSubmit() {
    console.log(this.myForm.value);
    this.successMessage = '';
    this.failMessage = '';
    this.resetPasswordService.forgotPassword(this.myForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['verifyResetCode']);
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        this.failMessage = error.error.message;
      },
    });
  }
}
