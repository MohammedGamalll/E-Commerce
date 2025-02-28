import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { IOnlinePayment } from '../../core/interfaces/payment/ionline-payment';
import { IOrder } from '../../core/interfaces/Orders/iorder';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-payment-gateway',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css',
})
export class PaymentGatewayComponent implements OnInit {
  fb = inject(FormBuilder);
  ordersService = inject(OrdersService);
  cartService = inject(CartService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  cartId = '';
  userId!: any;
  selecedPaymentMethod = '';
  _PLATFORM_ID = inject(PLATFORM_ID);
  token!: string;

  ngOnInit(): void {
    this.getCartId();
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token') as string;
    }
  }

  myForm: FormGroup = this.fb.group({
    city: [null, [Validators.required]],

    details: [''],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  getCartId() {
    return this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('id')!;
    });
  }

  onSubmit(selecedPaymentMethod: string) {
    console.log(this.cartId);

    this.selecedPaymentMethod = selecedPaymentMethod;
    if (this.selecedPaymentMethod === 'online') {
      this.onlinePayment();
    } else if (this.selecedPaymentMethod === 'cash') {
      this.cashOnDelivery();
    }
  }

  onlinePayment() {
    this.ordersService.onlinePayment(this.cartId, this.myForm.value).subscribe({
      next: (response: IOnlinePayment) => {
        console.log('API Response:', response);

        if (response && response.session && response.session.url) {
          const url = response.session.url.toString();

          window.location.assign(url);
        } else {
          console.error(
            'Invalid API response. Missing or incorrect session URL.'
          );
          alert(
            'An error occurred while processing your payment. Please try again later.'
          );
        }

        this.cartService.countCartItems.next(0);
      },
      error: (error) => {
        console.error('Error during online payment:', error);
        alert(
          'An error occurred while processing your payment. Please try again later.'
        );
      },
    });
  }

  cashOnDelivery() {
    this.ordersService
      .cashOnDelivery(this.cartId, this.myForm.value)
      .subscribe({
        next: (response: IOrder) => {
          console.log(response);
          this.cartService.countCartItems.next(0);
          this.router.navigate(['/allorders']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
