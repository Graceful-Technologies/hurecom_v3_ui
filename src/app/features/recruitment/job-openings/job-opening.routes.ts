import { Routes } from '@angular/router';
import { ListJobOpenings } from './list-job-openings/list-job-openings';

export const JOB_OPENING_ROUTES: Routes = [
    {
        path: '',
        component: ListJobOpenings
    },
    {
        path: 'apply/:id',
        loadComponent: () =>
            import('./apply-job/apply-job').then(m => m.ApplyJob)
    },
];