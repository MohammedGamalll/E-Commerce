import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { IProducts } from '../../core/interfaces/products/iproducts';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productsService = inject(ProductsService);
  allProducts!: IProducts;
  cartService = inject(CartService);
  toaster = inject(ToastrService);

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        // console.log(products);
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
        console.log(response);
        this.cartService.countCartItems.next(response.numOfCartItems);

        this.toaster.success('Added To Cart Successfully', 'Success !');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
