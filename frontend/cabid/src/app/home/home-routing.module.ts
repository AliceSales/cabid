import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DetailsPage } from '../pages/details/details.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'details',
    component: DetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
