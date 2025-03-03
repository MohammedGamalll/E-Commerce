import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { IProducts } from '../../core/interfaces/products/iproducts';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../shared/pipes/search-product.pipe';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product',
  imports: [
    CurrencyPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SearchProductPipe,
    NgClass,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productsService = inject(ProductsService);
  allProducts!: IProducts;
  cartService = inject(CartService);
  toaster = inject(ToastrService);
  searchValue: string = '';
  wishlistService = inject(WishlistService);
  isClicked = false;
  wishlist!: IWishlist;

  ngOnInit() {
    this.getAllProducts();
    // this.getWishlist();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.getWishlist();
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

  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlist = response;
        console.log(response);
        for (let i = 0; i < this.wishlist.data.length; i++) {
          for (let j = 0; j < this.allProducts.data.length; j++) {
            if (this.wishlist.data[i]._id === this.allProducts.data[j]._id) {
              console.log('wishlist data : ', this.wishlist.data[i]._id);
              console.log('all products data : ', this.allProducts.data[j]._id);
              this.allProducts.data[j].inWislist = true;
              console.log(
                'product wishlist : ',
                this.allProducts.data[j].inWislist
              );
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToWishlist(Pid: string) {
    this.wishlistService.addToWishlist(Pid).subscribe({
      next: (response) => {
        // console.log(response);
        this.toaster.success('Added To Wishlist Successfully', 'Success !');
        this.allProducts.data.forEach((product) => {
          if (product._id === Pid) {
            product.inWislist = true;
          }
        });
      },
      error: (error) => {
        this.toaster.error('Error Adding To Wishlist', 'Error !');
        console.log(error);
      },
    });
  }

  removeFromWishlist(Pid: string) {
    this.wishlistService.removeFromWishlist(Pid).subscribe({
      next: (response) => {
        this.toaster.success('Removed From Wishlist Successfully', 'Success !');
        this.allProducts.data.forEach((product) => {
          if (product._id === Pid) {
            product.inWislist = false;
          }
        });
      },
      error: (error) => {
        this.toaster.error('Error Removing From Wishlist', 'Error !');
        console.log(error);
      },
    });
  }

  wishListBtn(Pid: string) {
    this.allProducts.data.forEach((product) => {
      if (product._id === Pid) {
        if (product.inWislist === undefined) {
          product.inWislist = false;
        }
        this.isClicked = product.inWislist as boolean;
        // console.log(this.isClicked);
      }
    });
    if (this.isClicked === true) {
      this.removeFromWishlist(Pid);
      this.isClicked = false;
    } else {
      this.addToWishlist(Pid);
      this.isClicked = true;
    }
  }
}
