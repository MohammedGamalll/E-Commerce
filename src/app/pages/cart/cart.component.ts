import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { get } from 'http';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cart!: ICart;

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart: ICart) => {
        this.cart = cart;
        console.log(this.cart);
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
          console.log(this.cart);
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
          console.log(this.cart);
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
        console.log(this.cart);
        this.cartService.countCartItems.next(this.cart.data.products.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
