import { AgGridModule } from '@ag-grid-community/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ColorPickerModule } from 'ngx-color-picker';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ClusteredBarGraphComponent } from './components/clustered-bar-graph/clustered-bar-graph.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TableComponent } from './components/table/table.component';
import { TestimonialCardComponent } from './components/testimonial-card/testimonial-card.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuBodyComponent } from './components/user-menu-body/user-menu-body.component';
import { UserMenuHeaderComponent } from './components/user-menu-header/user-menu-header.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { OVERLAY_DATA } from './config/overlay.config';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { OverlayService } from './services/overlay.service';
import { HomeComponent } from './views/home/home.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { PublicComponent } from './views/public/public.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { CreateVendorComponent } from './views/vendor/create-vendor/create-vendor.component';
import { ViewVendorsComponent } from './views/vendor/view-vendors/view-vendors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    UserMenuComponent,
    UserMenuHeaderComponent,
    UserMenuBodyComponent,
    BarGraphComponent,
    SearchBarComponent,
    CreateVendorComponent,
    ViewVendorsComponent,
    TableComponent,
    PublicComponent,
    LogInComponent,
    NotificationsPanelComponent,
    ClusteredBarGraphComponent,
    NotificationSnackbarComponent,
    FooterComponent,
    ThemePickerComponent,
    CarouselComponent,
    SignInComponent,
    TestimonialCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    AgGridModule.withComponents([]),
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ColorPickerModule,
    NgbCarouselModule,
    NgbRatingModule
  ],
  providers: [
    {
      provide: OVERLAY_DATA,
      useClass: OverlayService
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LclMMUUAAAAAF-vgQ2AlVYuXj6dbn20hDwnWHiM' } as RecaptchaSettings
    },
    CookieService,
    AuthGuardGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SearchBarComponent,
    LogInComponent,
    NotificationsPanelComponent,
    NotificationSnackbarComponent,
    ThemePickerComponent
  ]
})
export class AppModule {}
