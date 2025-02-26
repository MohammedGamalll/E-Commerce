import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../interfaces/cart/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpClient = inject(HttpClient);
  countCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post<any>(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId }
    );
  }

  getCart(): Observable<ICart> {
    return this.httpClient.get<ICart>(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }

  updateCartItemQuantity(count: {}, prodId: string): Observable<ICart> {
    return this.httpClient.put<ICart>(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
      count
    );
  }

  clearCart(): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }
}
