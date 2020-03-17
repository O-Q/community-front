import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/state';
import * as SocialActions from '../../../../store/social/social.actions';

import { getMergedRoute } from '../../../../store/router/router.selectors';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { startWith, map, first, take, skip } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppItem } from './../../../../interfaces/item.interface';
import { FLAIR_MAX_COUNT } from '../../../../constants/social.constant';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {
  currentRoute$ = this.store.select(getMergedRoute);
  social$ = this.store.select('social');

  separatorKeysCodes: number[] = [ENTER];
  filteredFlairs: Observable<AppItem[]>;
  selectedFlairs: Set<string> = new Set();
  suggestedFlairs: AppItem[] = [
    { value: 'موبایل', viewValue: 'موبایل' },
    { value: 'نقاشی', viewValue: 'نقاشی' },
    { value: 'رمزارزها', viewValue: 'رمزارزها' },
    { value: 'سلامتی', viewValue: 'سلامتی' }
  ];
  form: FormGroup;
  @ViewChild('flairInput') flairInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') auto: MatAutocomplete;

  constructor(private store: Store<fromApp.AppState>) {
    this.form = new FormGroup({
      sname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      subject: new FormControl('', Validators.required),
      flairs: new FormControl('')
    });

    this.filteredFlairs = this.form.get('flairs').valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filterFlair(fruit) : this.suggestedFlairs.slice()));
  }

  ngOnInit(): void {
  }

  // add new flair
  addFlair(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value && this.selectedFlairs.size <= FLAIR_MAX_COUNT) {
      this.selectedFlairs.add(value);

      if (input) {
        input.value = '';
      }
      this.form.get('flairs').setValue(null);
    }
  }

  removeFlair(fruit: string): void {
    const option = this.auto.options.find(o => o.disabled && o.value.value === fruit);
    if (option) {
      option.disabled = false;
    }
    this.selectedFlairs.delete(fruit);
  }

  // select from suggested or اضافه کردن x
  clickFlair(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedFlairs.size <= FLAIR_MAX_COUNT) {
      this.selectedFlairs.add(event.option.value.value);
      this.flairInput.nativeElement.value = '';
      this.form.get('flairs').setValue(null);
      event.option.disabled = true;
    }
  }

  private _filterFlair(value: string): AppItem[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      const x = this.suggestedFlairs.filter(fruit => fruit.value.toLowerCase().indexOf(filterValue) === 0);
      x.push({ value, viewValue: `اضافه کردن "${value}"` });
      return x;
    }
  }

  onCreate(socialType: string) {
    if (this.form.valid) {
      const formControls = this.form.value;
      const name = formControls.sname;
      const description = formControls.description;
      const subject = formControls.subject;
      const flairs = Array.from(this.selectedFlairs);
      this.store.dispatch(SocialActions.SocialCreating({
        name, description, subject, flairs, socialType
      }));
    }
  }
}
