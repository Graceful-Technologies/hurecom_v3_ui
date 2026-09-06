import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private messageService = inject(MessageService);

    success(detail: string, summary: string = 'Success') {
        this.messageService.add({
            severity: 'success',
            summary,
            detail
        });
    }

    error(detail: string, summary: string = 'Error') {
        this.messageService.add({
            severity: 'error',
            summary,
            detail
        });
    }

    warn(detail: string, summary: string = 'Warning') {
        this.messageService.add({
            severity: 'warn',
            summary,
            detail
        });
    }

    info(detail: string, summary: string = 'Info') {
        this.messageService.add({
            severity: 'info',
            summary,
            detail
        });
    }
}