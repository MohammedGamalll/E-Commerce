import { get } from 'http';
import { ICategory } from '../../../core/interfaces/categories/icategory';
import { CategoriesService } from './../../../core/services/categories/categories.service';
import { Component, inject } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-categories',
  imports: [CarouselModule],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css',
})
export class HomeCategoriesComponent {
  categoriesService = inject(CategoriesService);
  allCategories!: ICategory;
  constructor() {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
}
