import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlist } from '../../interfaces/wishlist/iwishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private httpClient: HttpClient) {}

  getWishlist(): Observable<IWishlist> {
    return this.httpClient.get<IWishlist>(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }

  addToWishlist(productId: string) {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: productId,
      }
    );
  }

  removeFromWishlist(productId: string) {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
    );
  }
}
