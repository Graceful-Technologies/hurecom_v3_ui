import { Routes } from '@angular/router';
import { ListClients } from './list-clients/list-clients';

export const CLIENT_ROUTES: Routes = [
    {
        path: '',
        component: ListClients
    },
    {
        path: 'view/:id',
        loadComponent: () =>
            import('./view-client/view-client').then(m => m.ViewClient)
    },
];