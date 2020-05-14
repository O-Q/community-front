import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogSettingsRoutingModule } from './blog-settings-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialBaseModule } from '../../../../material.module';
import { BlogSettingsGeneralComponent } from './blog-settings-general/blog-settings-general.component';
import { BlogSettingsComponent } from './blog-settings.component';
import { FlairsAutoCompleteModule } from '../../shared/flairs-auto-complete/flairs-auto-complete.module';
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from '../../shared/color-picker/color-picker.module';
import { BlogSettingsWidgetsComponent } from './blog-settings-widgets/blog-settings-widgets.component';
import { BlogSettingsPermissionComponent } from './blog-settings-permission/blog-settings-permission.component';


@NgModule({
  declarations: [BlogSettingsGeneralComponent, BlogSettingsComponent, BlogSettingsWidgetsComponent, BlogSettingsPermissionComponent],
  imports: [
    CommonModule,
    BlogSettingsRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MaterialBaseModule,
    MatSelectModule,
    FlairsAutoCompleteModule,
    ColorPickerModule,
  ]
})
export class BlogSettingsModule { }
