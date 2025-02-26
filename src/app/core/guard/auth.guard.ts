import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);
  let token!: string | null;
  if (isPlatformBrowser(_PLATFORM_ID)) {
    token = localStorage.getItem('token');
  }

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
