import { Routes } from '@angular/router';
import { ListUsers } from './list-users/list-users';

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: ListUsers
    }
];