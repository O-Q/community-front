import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // overlay container affects on overlay things like snackbar and dialog
  constructor(private overlay: OverlayContainer) {}
  darkTheme() {
    document.body.classList.add('unicorn-dark-theme');
    this.overlay.getContainerElement().classList.add('unicorn-dark-theme');
  }
  defaultTheme() {
    document.body.classList.remove('unicorn-dark-theme');
    this.overlay.getContainerElement().classList.remove('unicorn-dark-theme');
  }
}
