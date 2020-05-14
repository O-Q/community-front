import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-content',
  templateUrl: './button-content.component.html',
  styleUrls: ['./button-content.component.scss']
})
export class ButtonContentComponent implements OnInit {
  @Input()
  isLoading: boolean;

  @Input()
  content: string;
  constructor() { }

  ngOnInit(): void {
  }

}
