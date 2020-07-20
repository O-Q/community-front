import { Component, OnInit } from '@angular/core';
import { AppState } from '@store/state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, skipWhile } from 'rxjs/operators';

import * as UserActions from '@store/user/user.actions';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  user$ = this.store.select('user');
  form: FormGroup;
  userConnection = [
    { value: 'nobody', viewValue: 'هیچکس' },
    { value: 'followers', viewValue: 'دنبال‌کنندگان' },
    { value: 'registered', viewValue: 'افراد عضو' },
    { value: 'all', viewValue: 'همه' },
  ];
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.store.select('user').pipe(skipWhile(u => u.user === null), first()).subscribe(u => {
      this.form = new FormGroup({
        profile: new FormControl(u.user.privacy?.profile || 'all', [Validators.required]),
        email: new FormControl(u.user.privacy?.email || 'all', [Validators.required]),
        posts: new FormControl(u.user.privacy?.posts || 'all', [Validators.required])
      });
    });

  }


  onSave() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.store.dispatch(UserActions.UserPrivacyUpdating({ privacy: this.form.value }));
    }
  }
}
