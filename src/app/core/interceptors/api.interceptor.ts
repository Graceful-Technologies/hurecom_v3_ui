import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '@/app/core/services/toast-service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

    const toast = inject(ToastService);

    return next(req).pipe(

        //  Handle success responses
        // (only when response has message)
        tap((event: any) => {
            if (event?.body?.success && event?.body?.message) {
                toast.success(event.body.message);
            }
        }),

        // Handle errors globally
        catchError((error) => {
            const res = error?.error;

            //  Validation errors
            if (res?.data && typeof res.data === 'object') {
                return throwError(() => error);
            }

            // Normal errors
            else if (res?.message) {
                toast.error(res.message);
            }
            //  fallback
            else {
                toast.error('Something went wrong. Please contact support.');
            }

            return throwError(() => error);
        })
    );
};