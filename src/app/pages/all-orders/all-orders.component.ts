import { jwtDecode } from 'jwt-decode';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { IOrders } from '../../core/interfaces/Orders/iorders';
import { get } from 'http';
import { IOrder } from '../../core/interfaces/Orders/iorder';
import { ReverseOrdersPipe } from '../../shared/pipes/reverse-orders.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface userData {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-all-orders',
  imports: [ReverseOrdersPipe,DatePipe,CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {
  ordersService = inject(OrdersService);
  allOrders!: IOrders;
  token!: string;
  decodedToken!: userData;
  userId!: string;

  ngOnInit(): void {
    this.getUserId();
    this.getAllOrders(this.userId);
  }

  getAllOrders(userId: string) {
    this.ordersService.getOrders(userId).subscribe({
      next: (data: IOrders) => {
        this.allOrders = data;
        console.log(data);
        console.log(this.allOrders);
      },
      error: (err) => {
        console.log(err);
      },  
    });
  }
  getUserId() {
    this.token = localStorage.getItem('token')!;
    this.decodedToken = jwtDecode(this.token);
    this.userId = this.decodedToken.id;
  }
}
