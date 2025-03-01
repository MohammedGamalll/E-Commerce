// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
// import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';
// import { LoginComponent } from './auth/pages/login/login.component';
// import { RegisterComponent } from './auth/pages/register/register.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { ProductComponent } from './pages/product/product.component';
// import { DetailsComponent } from './pages/details/details.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ForgetPasswordComponent } from './auth/pages/forget-password/forget-password.component';
// import { verify } from 'crypto';
// import { VerifyResetCodeComponent } from './auth/pages/verify-reset-code/verify-reset-code.component';
// import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
// import { authGuard } from './core/guard/auth.guard';
// import { homeGuard } from './core/guard/home.guard';
// import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';
// import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
// import { WishlistComponent } from './pages/wishlist/wishlist.component';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/login',
//     pathMatch: 'full',
//   },
//   {
//     path: '',
//     component: AuthLayoutComponent,
//     canActivate: [homeGuard],
//     children: [
//       {
//         path: 'login',
//         loadComponent: () =>
//           import('./auth/pages/login/login.component').then(
//             (e) => e.LoginComponent
//           ),
//         title: 'Sign In',
//       },
//       {
//         path: 'register',
//         loadComponent: () =>
//           import('./auth/pages/register/register.component').then(
//             (e) => e.RegisterComponent
//           ),
//         title: 'Sign Up',
//       },
//       {
//         path: 'forgetPassword',
//         loadComponent: () =>
//           import('./auth/pages/forget-password/forget-password.component').then(
//             (e) => e.ForgetPasswordComponent
//           ),
//         title: 'Forget Password',
//       },
//       {
//         path: 'verifyResetCode',
//         component: VerifyResetCodeComponent,
//         title: 'Forget Password',
//       },
//       {
//         path: 'resetPassword',
//         component: ResetPasswordComponent,
//         title: 'Forget Password',
//       },
//     ],
//   },
//   {
//     path: '',
//     component: MainLayoutComponent,
//     canActivate: [authGuard],
//     children: [
//       { path: 'home', component: HomeComponent, title: 'Fast-Cart Home' },
//       {
//         path: 'categories',
//         component: CategoriesComponent,
//         title: 'Fast-Cart Categories',
//       },
//       { path: 'brands', component: BrandsComponent, title: 'Fast-Cart Brands' },
//       {
//         path: 'products',
//         component: ProductComponent,
//         title: 'Fast-Cart Products',
//       },
//       {
//         path: 'details/:id',
//         component: DetailsComponent,
//       },
//       { path: 'cart', component: CartComponent, title: 'Fast-Cart Cart' },
//       {
//         path: 'payment/:id',
//         component: PaymentGatewayComponent,
//         title: 'Fast-Cart Payment',
//       },
//       {
//         path: 'allorders',
//         component: AllOrdersComponent,
//         title: 'Fast-Cart All Orders',
//       },
//       {
//         path: 'wishlist',
//         component: WishlistComponent,
//         title: 'Fast-Cart Wishlist',
//       },
//     ],
//   },
//   { path: '**', component: NotfoundComponent, title: 'Not Found' },
// ];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guard/auth.guard';
import { homeGuard } from './core/guard/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [homeGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login/login.component').then(
            (e) => e.LoginComponent
          ),
        title: 'Sign In',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/pages/register/register.component').then(
            (e) => e.RegisterComponent
          ),
        title: 'Sign Up',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./auth/pages/forget-password/forget-password.component').then(
            (e) => e.ForgetPasswordComponent
          ),
        title: 'Forget Password',
      },
      {
        path: 'verifyResetCode',
        loadComponent: () =>
          import(
            './auth/pages/verify-reset-code/verify-reset-code.component'
          ).then((e) => e.VerifyResetCodeComponent),
        title: 'Verify Reset Code',
      },
      {
        path: 'resetPassword',
        loadComponent: () =>
          import('./auth/pages/reset-password/reset-password.component').then(
            (e) => e.ResetPasswordComponent
          ),
        title: 'Reset Password',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((e) => e.HomeComponent),
        title: 'Fast-Cart Home',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (e) => e.CategoriesComponent
          ),
        title: 'Fast-Cart Categories',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (e) => e.BrandsComponent
          ),
        title: 'Fast-Cart Brands',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (e) => e.ProductComponent
          ),
        title: 'Fast-Cart Products',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (e) => e.DetailsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((e) => e.CartComponent),
        title: 'Fast-Cart Cart',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./pages/payment-gateway/payment-gateway.component').then(
            (e) => e.PaymentGatewayComponent
          ),
        title: 'Fast-Cart Payment',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/all-orders/all-orders.component').then(
            (e) => e.AllOrdersComponent
          ),
        title: 'Fast-Cart All Orders',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (e) => e.WishlistComponent
          ),
        title: 'Fast-Cart Wishlist',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (e) => e.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
