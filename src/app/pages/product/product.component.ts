import { Component, inject, NgModule } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { IProducts } from '../../core/interfaces/products/iproducts';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../shared/pipes/search-product.pipe';

@Component({
  selector: 'app-product',
  imports: [
    CurrencyPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SearchProductPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  allProducts!: IProducts;
  cartService = inject(CartService);
  toaster = inject(ToastrService);
  searchValue: string = '';

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addToCart(Pid: string) {
    this.cartService.addProductToCart(Pid).subscribe({
      next: (response) => {
        this.cartService.countCartItems.next(response.numOfCartItems);

        this.toaster.success('Added To Cart Successfully', 'Success !');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
