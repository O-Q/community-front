import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/services/theme.service';
import { LoginComponent } from '../login/login.component';
import { State } from '../../../store/user/user.reducer';
import { AppState } from '../../../store/state';
import * as AuthActions from './../../../store/auth/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<State>;
  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select('user');

  }

  ngOnInit() {
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
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
