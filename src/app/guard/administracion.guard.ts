import { CanActivateFn } from '@angular/router';

export const administracionGuard: CanActivateFn = (route, state) => {
  return true;
};
