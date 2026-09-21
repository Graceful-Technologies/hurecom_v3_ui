import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private snackBar = inject(MatSnackBar);

    success(detail: string, summary: string = 'Success') {
        this.snackBar.open(detail, summary, {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    error(detail: string, summary: string = 'Error') {
        this.snackBar.open(detail, summary, {
            duration: 4000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    warn(detail: string, summary: string = 'Warning') {
        this.snackBar.open(detail, summary, {
            duration: 4000,
            panelClass: ['snackbar-warn'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    info(detail: string, summary: string = 'Info') {
        this.snackBar.open(detail, summary, {
            duration: 3000,
            panelClass: ['snackbar-info'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}