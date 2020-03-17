import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-line',
  template: `
    <div style="background-color: #80808080; height: 16px;  margin: 5px"
     [ngStyle]="{width: width ? width+'%' :'auto', height: height ? height+'px' : '16px', 'border-radius': radius ? radius+'px' : '1px'}"
     ></div>`,

})
export class SkeletonLineComponent {
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  radius: number;
}
