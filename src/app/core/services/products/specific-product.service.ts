import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../interfaces/products/iproducts';
import { IproductDetails } from '../../interfaces/products/iproduct-details';

@Injectable({
  providedIn: 'root',
})
export class SpecificProductService {
  httpClient = inject(HttpClient);
  getspecificProduct(id: string): Observable<IproductDetails> {
    return this.httpClient.get<IproductDetails>(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
