import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'organizations',
        pathMatch: 'full'
    },

    // AUTH LAYOUT (login, register, forgot, reset)
    {
        path: '',
        loadComponent: () =>
            import('./core/layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./features/auth/login/login').then(m => m.Login),
                canActivate: [noAuthGuard]
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./features/auth/register/register').then(m => m.Register),
                canActivate: [noAuthGuard]
            },
            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('./features/auth/forgot-password/forgot-password')
                        .then(m => m.ForgotPassword),
                canActivate: [noAuthGuard]
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('./features/auth/reset-password/reset-password')
                        .then(m => m.ResetPassword),
                canActivate: [noAuthGuard]
            }
        ]
    },

    // APP LAYOUT (protected routes)
    {
        path: '',
        loadComponent: () => import('./core/layout/app-layout/app-layout').then(m => m.AppLayout),
        canActivate: [authGuard],
        children: [
            {
                path: 'my-account',
                loadComponent: () => import('./features/account/account').then(m => m.Account)
            },
            {
                path: 'organizations',
                loadChildren: () => import('./features/admin/organizations/organization.routes').then(m => m.ORGANIZATION_ROUTES)
            },
            {
                path: 'users',
                loadChildren: () => import('./features/admin/users/user.routes').then(m => m.USER_ROUTES)
            },
            {
                path: 'roles',
                loadChildren: () => import('./features/admin/roles/role.routes').then(m => m.ROLE_ROUTES)
            },
            {
                path: 'teams',
                loadChildren: () => import('./features/admin/teams/team.routes').then(m => m.TEAM_ROUTES)
            },
            {
                path: 'clients',
                loadChildren: () => import('./features/master/clients/client.routes').then(m => m.CLIENT_ROUTES)
            },
            {
                path: 'jobs',
                loadChildren: () => import('./features/master/jobs/job.routes').then(m => m.JOB_ROUTES)
            },
            {
                path: 'candidates',
                loadChildren: () => import('./features/recruitment/candidates/candidate.routes').then(m => m.CANDIDATE_ROUTES)
            },
            {
                path: 'job-openings',
                loadChildren: () => import('./features/recruitment/job-openings/job-opening.routes').then(m => m.JOB_OPENING_ROUTES)
            },
        ]
    },

    // fallback
    {
        path: '**',
        redirectTo: 'organizations'
    }
];
