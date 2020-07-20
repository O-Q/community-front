import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '@store/state';
import * as SocialActions from '@store/social/social.actions';
import { requiredError } from '@app/utils/form.util';
import { getMergedRoute } from '@store/router/router.selectors';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SocialType } from '@app/models/user.model';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
  SocialType = SocialType;
  required = requiredError;
  currentRoute$ = this.store.select(getMergedRoute);
  social$ = this.store.select('social');
  selectedFlairs: Set<string> = new Set();

  form: FormGroup;


  constructor(private store: Store<fromApp.AppState>) {
    this.form = new FormGroup({
      sname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      subject: new FormControl('', Validators.required),
      flairs: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onCreate(socialType: SocialType) {
    if (this.form.valid) {
      const { sname, description, title, subject } = this.form.value;
      const flairs = Array.from(this.selectedFlairs);
      this.store.dispatch(SocialActions.SocialCreating({
        name: sname, description, subject, title, flairs, socialType
      }));
    }
  }
}
