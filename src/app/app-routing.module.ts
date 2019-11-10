import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CreateVendorComponent } from './views/vendor/create-vendor/create-vendor.component';
import { ViewVendorsComponent } from './views/vendor/view-vendors/view-vendors.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'view-vendors', component: ViewVendorsComponent },
  { path: 'create-vendor', component: CreateVendorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
