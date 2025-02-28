import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { WishlistComponent } from './../wishlist/wishlist.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SpecificProductService } from '../../core/services/products/specific-product.service';
import { IproductDetails } from '../../core/interfaces/products/iproduct-details';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IWishlist } from '../../core/interfaces/wishlist/iwishlist';
import { get } from 'http';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule, NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  specificProductService = inject(SpecificProductService);
  wishlistService = inject(WishlistService);
  title = inject(Title);
  meta = inject(Meta);
  cartService = inject(CartService);
  toaster = inject(ToastrService);
  prodID!: string;
  productDetails!: IproductDetails;
  mainImage!: string;
  selectedImage!: string;
  isClicked = false;
  wishlist!: IWishlist;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.prodID = params['id'];
      console.log(this.prodID);
    });

    this.getSpecificProduct();
    this.getWishlist();
  }

  getWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        this.wishlist = response;
        if (this.wishlist.data.some((item) => item._id === this.prodID)) {
          this.isClicked = true;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSpecificProduct() {
    this.specificProductService.getspecificProduct(this.prodID).subscribe({
      next: (product) => {
        this.productDetails = product;
        this.title.setTitle(product.data.title);
        this.meta.addTags([
          {
            name: 'description',
            content: product.data.description,
          },
          {
            name: 'keywords',
            content: product.data.title,
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'author',
            content: 'Fast-Cart',
          },

          {
            name: 'date',
            content: product.data.createdAt,
          },
        ]);
        this.mainImage = product.data.imageCover;
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

  addToWishlist(Pid: string) {
    this.wishlistService.addToWishlist(Pid).subscribe({
      next: (response) => {
        this.toaster.success('Added To Wishlist Successfully', 'Success !');
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
      },
      error: (error) => {
        this.toaster.error('Error Removing From Wishlist', 'Error !');
        console.log(error);
      },
    });
  }

  wishListBtn(Pid: string) {
    if (this.isClicked) {
      this.removeFromWishlist(Pid);
      this.isClicked = false;
    } else if (!this.isClicked) {
      this.addToWishlist(Pid);
      this.isClicked = true;
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 4,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  changeMainImage(image: string) {
    this.mainImage = image;
  }
  @ViewChild('popup') popup!: ElementRef;

  openPopUp(event: any) {
    let element = this.popup.nativeElement as HTMLElement;
    element.classList.remove('hidden');
    element.classList.add('imagePopup');
  }
  closePopup() {
    let element = this.popup.nativeElement as HTMLElement;
    element.classList.add('hidden');
    element.classList.remove('imagePopup');
  }
}
