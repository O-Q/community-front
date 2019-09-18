import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHomeComponent } from './community-home/community-home.component';
import { CommunityRoutingModule } from './community-routing.module';

@NgModule({
  declarations: [CommunityHomeComponent],
  imports: [CommonModule, CommunityRoutingModule]
})
export class CommunityModule {}
