import { Component, inject, PLATFORM_ID } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  wishlist!: IWishlist;
  wishlistService = inject(WishlistService);
  toastr = inject(ToastrService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  router = inject(Router);
  isLoggedIn = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
        this.getWishlist();
      } else {
        this.isLoggedIn = false;
      }
    }
  }
  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlist = response;
        console.log(this.wishlist);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeItem(id: string) {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getWishlist();
        this.toastr.success('Item removed from wishlist');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
