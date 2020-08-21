import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumSettingsRoutingModule } from './forum-settings-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumSettingsComponent } from './../forum-settings/forum-settings.component';
import { ForumSettingsWidgetsComponent } from './forum-settings-widgets/forum-settings-widgets.component';
import { ForumSettingsGeneralComponent } from './forum-settings-general/forum-settings-general.component';
import { ForumSettingsPermissionComponent } from './forum-settings-permission/forum-settings-permission.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsWidgetListDialogComponent } from './forum-settings-widgets/settings-widget-list-dialog/settings-widget-list-dialog.component';
import { EditWidgetDialogComponent } from './forum-settings-widgets/edit-widget-dialog/edit-widget-dialog.component';
import { MaterialBaseModule } from '../../../../material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { FlairsAutoCompleteModule } from '../../shared/flairs-auto-complete/flairs-auto-complete.module';
import { ColorPickerModule } from '../../shared/color-picker/color-picker.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { getPersianPaginatorIntl } from '../../../intl/persian-paginator';
import { PermissionRoleDialogComponent } from './forum-settings-permission/permission-role-dialog/permission-role-dialog.component';

@NgModule({
  declarations: [
    ForumSettingsComponent,
    ForumSettingsWidgetsComponent,
    ForumSettingsGeneralComponent,
    ForumSettingsPermissionComponent,
    SettingsWidgetListDialogComponent,
    EditWidgetDialogComponent,
    PermissionRoleDialogComponent,
  ],
  imports: [
    CommonModule,
    ForumSettingsRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSlideToggleModule,
    DragDropModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MaterialBaseModule,
    MatAutocompleteModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    FlairsAutoCompleteModule,
    ColorPickerModule,
  ],
})
export class ForumSettingsModule { }
