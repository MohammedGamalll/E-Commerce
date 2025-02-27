import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HomeCategoriesComponent,ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
