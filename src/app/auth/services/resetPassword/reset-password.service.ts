import { VerifyResetCodeComponent } from './../../pages/verify-reset-code/verify-reset-code.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private httpClient: HttpClient) {}

  forgotPassword(data: {}): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }
  VerifyResetCode(data: {}): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      data
    );
  }
  resetPassword(data: {}): Observable<any> {
    return this.httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      data
    );
  }
}
