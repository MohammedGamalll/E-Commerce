import { SignUpService } from './../../services/sign-up.service';
import { signUpResponse } from './../../interfaces/IsignUpResponse';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  signUpService = inject(SignUpService);
  router = inject(Router);

  myForm: FormGroup = this.fb.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^[A-Z][a-z0-9]{7,}$/),
        ],
      ],
      rePassword: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.checkPasswords }
  );

  successMessage = '';
  failMessage = '';
  onSubmit() {
    this.successMessage = '';
    this.failMessage = '';
    this.signUpService.signUp(this.myForm.value).subscribe({
      next: (response: signUpResponse) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.failMessage = error.error.message;
      },
    });
  }

  checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password === rePassword ? null : { notSame: true };
  }
}
