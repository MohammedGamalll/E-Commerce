import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { SpecificProductService } from '../../core/services/products/specific-product.service';
import { IproductDetails } from '../../core/interfaces/products/iproduct-details';
import { CurrencyPipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  specificProductService = inject(SpecificProductService);
  title = inject(Title);
  meta = inject(Meta);
  prodID!: string;
  productDetails!: IproductDetails;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.prodID = params['id'];
      console.log(this.prodID);
    });

    this.getSpecificProduct();
  }

  getSpecificProduct() {
    this.specificProductService.getspecificProduct(this.prodID).subscribe({
      next: (product) => {
        console.log(product);
        this.productDetails = product;
        console.log(product.data.reviews);
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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(Pid: string) {
    console.log(Pid, 'Added to cart');
  }
}
