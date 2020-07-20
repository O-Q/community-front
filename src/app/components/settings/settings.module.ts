import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings.component';
import { MaterialBaseModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountComponent } from './account/account.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ChangeDialogComponent } from './account/change-dialog/change-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent, AccountComponent, PrivacyComponent, ChangeDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialBaseModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class SettingsModule { }
