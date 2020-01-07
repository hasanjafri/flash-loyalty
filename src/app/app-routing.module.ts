import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HomeComponent } from './views/home/home.component';
import { PublicComponent } from './views/public/public.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { CreateVendorComponent } from './views/vendor/create-vendor/create-vendor.component';
import { ViewVendorsComponent } from './views/vendor/view-vendors/view-vendors.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'view-vendors', component: ViewVendorsComponent },
  { path: 'create-vendor', component: CreateVendorComponent },
  { path: 'index', component: PublicComponent },
  { path: 'sign-in', component: SignInComponent }
  // { path: 'login/:type', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
