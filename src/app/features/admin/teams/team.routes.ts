import { Routes } from '@angular/router';
import { ListTeams } from './list-teams/list-teams';


export const TEAM_ROUTES: Routes = [
    {
        path: '',
        component: ListTeams
    },
    {
        path: 'view/:id',
        loadComponent: () =>
            import('./view-team/view-team').then(m => m.ViewTeam)
    },
];