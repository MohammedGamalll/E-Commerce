import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { IProducts } from '../../core/interfaces/products/iproducts';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  allProducts!: IProducts;

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.allProducts = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
