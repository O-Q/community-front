import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { getTextColor } from '../utils/color.util';
const DARK_THEME = 'unicorn-dark-theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // overlay container affects on overlay things like snackbar and dialog
  titleStyleNode;
  textStyleNode;
  primaryStyleNode;
  accentStyleNode;
  backgroundStyleNode;
  adaptColorWithBackgroundNode;
  // '.mat-button-base'
  textClassLists = ['#background-color .mat-card', '.mat-list-item', '.mat-subheader', '.mat-checkbox-label', '.mat-card-subtitle', '.mat-option:not(.mat-selected)'];
  noCustomBackground = ['.mat-select-panel',
    '.mat-menu-panel:not(.no-custom-theme)',
    '.mat-autocomplete-panel',
    '.mat-card:not(.no-custom-theme)'].map(i => `.cdk-overlay-container ${i}`).join(', ');
  noCustomTextColor = ['.mat-primary'].map(i => `.cdk-overlay-container ${i}`).join(', ');
  constructor(private overlay: OverlayContainer) { }
  isDark: boolean;
  initTheme() {
    if (localStorage.getItem('dark')) {
      this.darkTheme();
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }
  darkTheme() {
    localStorage.setItem('dark', '1');
    document.body.classList.add(DARK_THEME);
    this.overlay.getContainerElement().classList.add(DARK_THEME);
  }
  defaultTheme() {
    localStorage.removeItem('dark');
    document.body.classList.remove(DARK_THEME);
    this.overlay.getContainerElement().classList.remove(DARK_THEME);
  }
  changeToUserDefault() {
    const el = document.getElementById('title-color');
    const bcEl = document.getElementById('background-color');
    document.body.classList.remove('ct');
    if (el) {
      el.style.color = 'unset';
    }
    if (bcEl) {
      bcEl.classList.remove('ct');
      document.getElementById('background-color').style.backgroundColor = null;
    }
    const head = document.getElementsByTagName('head')[0];
    if (this.backgroundStyleNode) {
      head.removeChild(this.backgroundStyleNode);
      this.backgroundStyleNode = null;
    }
    if (this.textStyleNode) {
      head.removeChild(this.textStyleNode);
      this.textStyleNode = null;
    }
    if (this.primaryStyleNode) {
      head.removeChild(this.primaryStyleNode);
      this.primaryStyleNode = null;
    }
    if (this.accentStyleNode) {
      head.removeChild(this.accentStyleNode);
      this.accentStyleNode = null;
    }
    if (this.adaptColorWithBackgroundNode) {
      head.removeChild(this.adaptColorWithBackgroundNode);
      this.adaptColorWithBackgroundNode = null;
    }
  }
  changeColors(colors) {
    if (colors) {
      this._changeTitleColor(colors);
      this._changeBackgroundColor(colors);
      this._changeTextColor(colors);
      this._changePrimaryColor(colors);
      this._changeAccentColor(colors);
    } else {
      this.changeToUserDefault();
    }
  }
  changeColor(colors, colorType: 'title' | 'background' | 'text' | 'primary' | 'accent') {
    switch (colorType) {
      case 'title':
        this._changeTitleColor(colors);
        break;
      case 'background':
        this._changeBackgroundColor(colors);
        break;
      case 'text':
        this._changeTextColor(colors);
        break;
      case 'primary':
        this._changePrimaryColor(colors);
        break;
      case 'accent':
        this._changeAccentColor(colors);
        break;
    }
  }

  private _changeTitleColor(colors) {
    const style = document.createElement('style');

    style.innerHTML = `#title-color {
      color: ${colors.title} !important;
    }`;
    if (this.titleStyleNode) { // remove Node if exist
      this.titleStyleNode = document.getElementsByTagName('head')[0].removeChild(this.titleStyleNode);
    }
    this.titleStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
  }
  private _changeBackgroundColor(colors) {
    const style = document.createElement('style');
    style.innerHTML = `#background-color .mat-card, #background-color .mat-chip, #background-color .mat-table,#background-color .mat-paginator, ${this.noCustomBackground}{
      background-color: ${colors.background} !important; filter: brightness(85%);
    }
    #background-color {
      background-color: ${colors.background};
    }
    `;
    if (this.backgroundStyleNode) { // remove Node if exist
      this.backgroundStyleNode = document.getElementsByTagName('head')[0].removeChild(this.backgroundStyleNode);
    }
    this.backgroundStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    this._adaptColor(colors);
  }

  private _changePrimaryColor(colors) {
    const style = document.createElement('style');
    style.innerHTML = `
    #background-color .mat-primary:not(.picker-btn):not(.mat-form-field):not(.mat-button):not(.mat-stroked-button):not(.mat-icon) {
       background-color: ${colors.primary} !important;
      };`;
    if (this.primaryStyleNode) { // remove Node if exist
      this.primaryStyleNode = document.getElementsByTagName('head')[0].removeChild(this.primaryStyleNode);
    }
    this.primaryStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    this._adaptColor(colors);
  }
  private _changeAccentColor(colors) {
    const style = document.createElement('style');
    style.innerHTML =
      `#background-color .mat-accent:not(.mat-checkbox):not(.mat-slide-toggle):not(.mat-spinner):not(.mat-stroked-button)  {
        background-color: ${colors.accent} !important;
       }
       .cdk-overlay-container .mat-accent.mat-raised-button {
          background-color: ${colors.accent} !important;
        }
       `;
    if (this.accentStyleNode) { // remove Node if exist
      this.accentStyleNode = document.getElementsByTagName('head')[0].removeChild(this.accentStyleNode);
    }
    this.accentStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    this._adaptColor(colors);
  }

  private _changeTextColor(colors) {
    const style = document.createElement('style');
    style.innerHTML = `${this.textClassLists.join(', #background-color ')} { color: ${colors.text} !important; }`;
    if (this.textStyleNode) { // remove Node if exist
      this.textStyleNode = document.getElementsByTagName('head')[0].removeChild(this.textStyleNode);
    }
    this.textStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    this._adaptColor(colors);
  }

  private _adaptColor(colors) {
    const { text, primary, accent, background } = colors;
    const style = document.createElement('style');
    style.innerHTML = `
    .mat-button-base.mat-primary,.mat-icon.mat-primaryو .mat-chip, .mat-tab-link, .mat-option.mat-selected {
        color: ${getTextColor(primary, text)} !important;
    }
    .mat-button-base.mat-accent:not(.mat-stroked-button):not(.mat-button) {
            color: ${getTextColor(accent, text)} !important;
    }
    .mat-stroked-button,.mat-button:not(.no-custom-theme) {
      color: ${getTextColor(background, text)} !important;
    }
    `;
    if (this.adaptColorWithBackgroundNode) { // remove Node if exist
      this.adaptColorWithBackgroundNode = document.getElementsByTagName('head')[0].removeChild(this.adaptColorWithBackgroundNode);
    }
    this.adaptColorWithBackgroundNode = document.getElementsByTagName('head')[0].appendChild(style);
  }
}
