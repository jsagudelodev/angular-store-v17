import { CanActivateFn } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
export const AdminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user?.role === 'admin') {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
