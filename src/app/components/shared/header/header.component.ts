import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/services/theme.service';
import { LoginComponent } from '../login/login.component';
import * as fromApp from './../../../store/state';
import * as fromAuth from '../../../store/auth/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authState$: Observable<fromAuth.State>;
  constructor(
    private themeService: ThemeService,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }
  onLogin(): void {
    this.dialog.open(LoginComponent, {
      width: 'auto'
    });
  }

  onThemeChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.themeService.darkTheme();
    } else {
      this.themeService.defaultTheme();
    }
  }
}
