import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HomeCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
