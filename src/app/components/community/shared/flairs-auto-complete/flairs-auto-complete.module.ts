import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlairsAutoCompleteComponent } from './flairs-auto-complete.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FlairsAutoCompleteComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [FlairsAutoCompleteComponent]
})
export class FlairsAutoCompleteModule { }
