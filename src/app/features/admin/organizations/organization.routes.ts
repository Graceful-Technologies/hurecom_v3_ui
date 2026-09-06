import { Routes } from '@angular/router';
import { ListOrganizations } from './list-organizations/list-organizations';

export const ORGANIZATION_ROUTES: Routes = [
    {
        path: '',
        component: ListOrganizations
    }
];