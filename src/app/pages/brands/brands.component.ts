import { IBrands } from '../../core/interfaces/brands/ibrands';
import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  brandsService = inject(BrandsService);
  brands!: IBrands;
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
