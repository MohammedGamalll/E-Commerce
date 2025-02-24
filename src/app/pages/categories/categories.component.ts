import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
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

        console.log(this.allCategories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
