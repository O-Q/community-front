import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/services/theme.service';
import { LoginComponent } from '../login/login.component';
import { State } from '@store/user/user.reducer';
import { AppState } from '@store/state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import * as AuthActions from '@store/auth/auth.actions';
import * as SearchActions from '@store/search/search.actions';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput', { read: MatAutocompleteTrigger }) searchAuto: MatAutocompleteTrigger;
  @ViewChild('searchInput') searchInput: MatInput;

  user$: Observable<State>;
  isFirstCloseHappened = false;
  isOpenSearch = false;
  form: FormGroup;
  search$ = this.store.select('search');
  notificationCount$ = this.store.select('user').pipe(map(u => u.user?.socials?.reduce((a, b) => a + b.notifications.length, 0)));
  constructor(
    public themeService: ThemeService,
    public dialog: MatDialog,
    private store: Store<AppState>, private router: Router
  ) {
    this.user$ = this.store.select('user');
  }

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.minLength(3)])
    });
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((values) => this.onChangeForm(values));
  }
  onChangeForm(values: { text: string }) {
    if (this.form.valid && values.text) {
      this.store.dispatch(SearchActions.SearchFetching({ text: values.text, page: 1, itemsPerPage: 10 }));
    }
  }

  isMovingNeeded(el: HTMLElement) {
    return el.scrollWidth > 211;
  }
  onBlurSearch() {
    this.isFirstCloseHappened = true;
    this.isOpenSearch = false;
    setTimeout(() => {
      this.searchAuto.autocompleteDisabled = true;
      this.searchAuto.closePanel();
    }, 1000);
  }
  onFocusSearch() {
    this.isOpenSearch = true;
    // 1 sec delay for animation, then draw panel with correct position.
    setTimeout(() => {
      this.searchAuto.openPanel();
      this.searchAuto.updatePosition();
    }, 1000);
  }

  onResultClick(result) {
    this.isOpenSearch = false;
    const type = this._getURLPrefix(result.type);
    this.router.navigate(['/', type, result.name]);
    this.form.disable();
    this.form.get('text').setValue('');
    setTimeout(() =>
      this.form.enable(), 500
    );
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
    this.store.dispatch(AuthActions.logout({ silent: true, message: 'شما با موفقیت خارج شدید' }));
  }
  private _getURLPrefix(type: any) {
    switch (type) {
      case 'BLOG':
        return 'b';
      case 'FORUM':
        return 'c';
      case 'POST':
        return 'p';
      case 'USER':
        return 'u';
    }
  }
}
