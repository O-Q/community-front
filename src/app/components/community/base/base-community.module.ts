import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { MaterialBaseModule } from '../../../material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  { path: '', component: CreateCommunityComponent }
];

@NgModule({
  declarations: [CreateCommunityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialBaseModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
  ],
})
export class BaseCommunityModule { }
