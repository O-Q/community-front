import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {}
  // if its not working add overlayContainer
  darkTheme() {
    document.body.classList.add('unicorn-dark-theme');
  }
  defaultTheme() {
    document.body.classList.remove('unicorn-dark-theme');
  }
}
