import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../interfaces/categories/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<ICategory> {
    return this.httpClient.get<ICategory>(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
}
