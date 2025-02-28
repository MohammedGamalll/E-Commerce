import { CartService } from './../../services/cart.service';
import {
  afterNextRender,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  _PLATFORM_ID = inject(PLATFORM_ID);
  router = inject(Router);
  cartService = inject(CartService);
  flowbiteService = inject(FlowbiteService);
  userImage!: string | null;
  token!: string | null;
  userdata!: string | null;
  username!: string | null;
  useremail!: string | null;
  constructor() {
    afterNextRender(() => {
      initFlowbite();
    });
  }
  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token');
      this.userImage = localStorage.getItem('userImage');
      this.userdata = localStorage.getItem('userData');
      this.username = this.userdata ? JSON.parse(this.userdata).name : null;
      this.useremail = this.userdata ? JSON.parse(this.userdata).email : null;
    }
    if (this.token) {
      this.getCart();
    }
  }
  ngDoCheck() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token');
      this.userImage = localStorage.getItem('userImage');
      this.userdata = localStorage.getItem('userData');
      this.username = this.userdata ? JSON.parse(this.userdata).name : null;
      this.useremail = this.userdata ? JSON.parse(this.userdata).email : null;
    }
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartService.countCartItems.next(cart.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logout() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
