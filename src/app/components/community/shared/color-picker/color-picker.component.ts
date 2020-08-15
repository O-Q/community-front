import { Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input()
  readonly initialColor?: string;
  @Output()
  colorChange = new EventEmitter<string>();

  selectedColor: string;
  defaultColors = ['#000000', '#696969', '#808080', '#A9A9A9', '#D3D3D3',
    '#00008B', '#0000FF', '#1E90FF', '#6495ED', '#ADD8E6',
    '#800000', '#FF0000', '#FF4500', '#FF8C00', '#FFA500',
    '#006400', '#008000', '#808000', '#ADFF2F', '#FFFF00',
    '#4B0082', '#800080', '#BA5503', '#C71585', '#FF69B4'
  ];

  showColorPicker = false;
  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showColorPicker = false;
    }
  }
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.selectedColor = this.initialColor;
  }
  toggleColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }
  changeColor(color: string) {
    this.colorChange.emit(color);
    this.selectedColor = color;
  }

}
