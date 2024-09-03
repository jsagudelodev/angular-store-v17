import {
  HttpInterceptorFn,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);
export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

export const TimeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TIME)) {
    const start = performance.now();

    return next(req).pipe(
      tap(() => {
        const time = performance.now() - start + 'ms';
        console.log(req.url, time);
      })
    );
  }

  return next(req);
};
