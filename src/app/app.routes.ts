import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ProductComponent } from './pages/product/product.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ForgetPasswordComponent } from './auth/pages/forget-password/forget-password.component';
import { verify } from 'crypto';
import { VerifyResetCodeComponent } from './auth/pages/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Sign In' },
      { path: 'register', component: RegisterComponent, title: 'Sign Up' },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
      {
        path: 'verifyResetCode',
        component: VerifyResetCodeComponent,
        title: 'Forget Password',
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Fast-Cart Home' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Fast-Cart Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Fast-Cart Brands' },
      {
        path: 'products',
        component: ProductComponent,
        title: 'Fast-Cart Products',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      { path: 'cart', component: CartComponent, title: 'Fast-Cart Cart' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
