import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page';
import { SwtichesPageComponent } from './pages/swtiches-page/swtiches-page';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dinamicos',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwtichesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
