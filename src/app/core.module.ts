import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/shared/error/error.component';
import { HomeComponent } from './components/shared/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/shared/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadWidgetMap } from './components/widgets/lazy-widgets';
import { LAZY_WIDGETS } from './components/widgets/tokens';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth.interceptor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppCommonModule } from './components/common/common.module';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatListModule,
    AppCommonModule,
    MatDividerModule,
    MatButtonToggleModule,
  ],
  exports: [
    ErrorComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: LAZY_WIDGETS, useFactory: LoadWidgetMap },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

})
export class CoreModule { }
