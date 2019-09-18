import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-rule',
  templateUrl: './register-rule.component.html',
  styleUrls: ['./register-rule.component.scss']
})
export class RegisterRuleComponent implements OnInit {
  @ViewChild('rules', { static: false }) rulesContainer: ElementRef;

  constructor() {}

  ngOnInit() {}

  toggleRule() {
    const cl: DOMTokenList = this.rulesContainer.nativeElement.classList;
    cl.toggle('expanded');
    cl.toggle('collapsed');
  }
}
