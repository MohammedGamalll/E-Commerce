import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpClient = inject(HttpClient);
  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post<any>(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId }
    );
  }
}
