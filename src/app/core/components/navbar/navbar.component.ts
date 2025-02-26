import { CartService } from './../../services/cart.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';

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
  userImage!: string | null;
  token!: string | null;
  userdata!: string | null;
  username!: string | null;
  useremail!: string | null;
  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('token');
      this.userImage = localStorage.getItem('userImage');
      this.userdata = localStorage.getItem('userData');
      this.username = this.userdata ? JSON.parse(this.userdata).name : null;
      this.useremail = this.userdata ? JSON.parse(this.userdata).email : null;
    }
    this.cartService.getCart().subscribe({
      next: (cart) => {
        console.log(cart);
        this.cartService.countCartItems.next(cart.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  logout() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
