import { Routes } from '@angular/router';
import { ListCandidates } from './list-candidates/list-candidates';

export const CANDIDATE_ROUTES: Routes = [
    {
        path: '',
        component: ListCandidates
    },
    {
        path: 'view/:id',
        loadComponent: () =>
            import('./edit-candidate/edit-candidate').then(m => m.EditCandidate)
    },
];