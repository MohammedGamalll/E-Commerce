import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOnlinePayment } from '../../interfaces/payment/ionline-payment';
import { IOrder } from '../../interfaces/Orders/iorder';
import { IOrders } from '../../interfaces/Orders/iorders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}
  hash = '#';

  getOrders(id: string): Observable<IOrders> {
    return this.httpClient.get<IOrders>(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  onlinePayment(cartId: string, details: {}): Observable<IOnlinePayment> {
    return this.httpClient.post<IOnlinePayment>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-mohammed-gamal.vercel.app/#/`,
      { shippingAddress: details }
    );
  }

  cashOnDelivery(cartId: string, details: {}): Observable<IOrder> {
    return this.httpClient.post<IOrder>(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress: details }
    );
  }
}
