import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-line',
  template: `<p style="background-color: #80808080; height: 16px; border-radius:1px; margin: 5px"
  [ngStyle]="half ? {'width':'100px'} : { 'width': 'auto'}"></p>`,
})
export class SkeletonLineComponent {
  @Input()
  half: boolean;
}
