import { Routes } from '@angular/router';
import { DemoTableComponent } from './demo/demo-table/demo-table.component';

export const routes: Routes = [
  {
    path: '',
    component: DemoTableComponent,
    pathMatch: 'full',
  }
];
