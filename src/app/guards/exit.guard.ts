import { CanActivateFn } from '@angular/router';

export const ExitGuard: CanActivateFn = (route, state) => {
  return false;
};
