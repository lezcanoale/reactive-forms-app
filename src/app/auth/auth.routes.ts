import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page';

export const aunthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      },
    ],
  },
];

export default aunthRoutes;
