import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-register-rule',
  templateUrl: './register-rule.component.html',
  styleUrls: ['./register-rule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterRuleComponent implements OnInit {
  @ViewChild('rules', { static: false }) rulesContainer: ElementRef;
  isRuleOpen = false;
  constructor() {}

  ngOnInit() {}

  toggleRule() {
    const cl: DOMTokenList = this.rulesContainer.nativeElement.classList;
    cl.toggle('expanded');
    cl.toggle('collapsed');
    this.isRuleOpen = !this.isRuleOpen;
  }
}
