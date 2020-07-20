import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { AppItem } from '@app/interfaces/item.interface';
import { FLAIR_MAX_COUNT, suggestedFlairs } from '@app/constants/social.constant';
import { ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-flairs-auto-complete',
  templateUrl: './flairs-auto-complete.component.html',
  styleUrls: ['./flairs-auto-complete.component.scss']
})
export class FlairsAutoCompleteComponent implements OnInit {
  @Input()
  selectedFlairs;

  @Input()
  flairsControl: FormControl;

  @Input()
  placeholder?: string;

  separatorKeysCodes: number[] = [ENTER];
  filteredFlairs: Observable<AppItem[]>;
  @ViewChild('flairInput') flairInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') auto: MatAutocomplete;
  constructor() {
  }

  ngOnInit(): void {
    this.filteredFlairs = this.flairsControl.valueChanges.pipe(
      startWith(null as string),
      map((flair: string | null) => flair ? this._filterFlair(flair) : suggestedFlairs.slice()));
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
      this.flairsControl.setValue(null);
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
      this.flairsControl.setValue(null);
      event.option.disabled = true;
    }
  }

  private _filterFlair(value: string): AppItem[] {
    console.log('bib');

    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      const x = suggestedFlairs.filter(fruit => fruit.value.toLowerCase().indexOf(filterValue) === 0);
      x.push({ value, viewValue: `اضافه کردن "${value}"` });
      return x;
    }
  }
}
