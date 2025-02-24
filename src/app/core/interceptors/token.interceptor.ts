import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(_PLATFORM_ID)) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }

  return next(req);
};
