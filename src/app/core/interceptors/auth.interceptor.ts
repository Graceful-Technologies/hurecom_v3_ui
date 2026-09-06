import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);
    const token = localStorage.getItem('token');

    // Skip token for login API
    if (req.url.includes('/api/auth/login')) {
        return next(req);
    }

    let authReq = req;

    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error) => {

            if (error.status === 401) {
                console.log('401 detected → redirecting');

                localStorage.removeItem('token');
                router.navigate(['/login']);
            }

            return throwError(() => error);
        })
    );
};