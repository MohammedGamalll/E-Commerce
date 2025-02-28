import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  ngOnInit(): void {
    this.getWishlist();
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
