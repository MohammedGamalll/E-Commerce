import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../interfaces/categories/icategory';
import { IBrands } from '../../interfaces/brands/ibrands';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}

  getAllBrands(): Observable<IBrands> {
    return this.httpClient.get<IBrands>(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }
}
