import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { get } from 'http';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cart!: ICart;
  isHovered = false;
  token!: string | null;
  _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.getCart();
    }
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart: ICart) => {
        this.cart = cart;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  incrementQuantity(productId: string, currentCount: number): void {
    this.cartService
      .updateCartItemQuantity({ count: ++currentCount }, productId)
      .subscribe({
        next: (cart: ICart) => {
          this.cart = cart;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  decrementQuantity(productId: string, currentCount: number): void {
    this.cartService
      .updateCartItemQuantity({ count: --currentCount }, productId)
      .subscribe({
        next: (cart: ICart) => {
          this.cart = cart;
          this.cartService.countCartItems.next(this.cart.data.products.length);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  removeProductFromCart(productId: string): void {
    this.cartService.updateCartItemQuantity({ count: 0 }, productId).subscribe({
      next: (cart: ICart) => {
        this.cart = cart;
        this.cartService.countCartItems.next(this.cart.data.products.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.cart.data.products = [];
        this.cartService.countCartItems.next(0);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
