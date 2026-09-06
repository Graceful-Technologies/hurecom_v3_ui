import { Routes } from '@angular/router';
import { ListJobs } from './list-jobs/list-jobs';

export const JOB_ROUTES: Routes = [
    {
        path: '',
        component: ListJobs
    },
    {
        path: 'view/:id',
        loadComponent: () =>
            import('./view-job/view-job').then(m => m.ViewJob)
    },
];