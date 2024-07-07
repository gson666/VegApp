import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedin()){
    return true;
  }else{
    console.log('User is not logged in, redirecting to login');
    router.navigate(['/login']);
  return false;
  }
  
};
