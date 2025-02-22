import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../interfaces/products/iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);
  getAllProducts(): Observable<IProducts> {
    return this.httpClient.get<IProducts>(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
}
