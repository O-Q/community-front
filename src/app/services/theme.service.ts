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
  textClassLists = ['#background-color .mat-card', '.mat-list-item', '.f-medium-subtitle', 'p', 'ul', 'li', 'span:not(.f-forum-title):not(.f-large-subtitle)', 'figcaption', 'a', 'div', '.mat-menu-content', '.mat-subheader', '.mat-checkbox-label', '.mat-card-subtitle', '.mat-option:not(.mat-selected)'];
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
    } else {
      this.isDark = false;
    }
  }
  darkTheme() {
    localStorage.setItem('dark', '1');
    this.isDark = true;
    document.body.classList.add(DARK_THEME);
    this.overlay.getContainerElement().classList.add(DARK_THEME);
  }
  defaultTheme() {
    localStorage.removeItem('dark');
    this.isDark = false;
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
    this._removeAdaptColor();
    this._removeAccentColor();
    this._removePrimaryColor();
    this._removeBackgroundColor();
    this._removeTextColor();
    this._removeTitleColor();
  }
  private _removeAdaptColor() {
    if (this.adaptColorWithBackgroundNode) {
      const head = document.getElementsByTagName('head')[0];
      head.removeChild(this.adaptColorWithBackgroundNode);
      this.adaptColorWithBackgroundNode = null;
    }
  }

  private _removePrimaryColor() {
    if (this.primaryStyleNode) {
      const head = document.getElementsByTagName('head')[0];
      head.removeChild(this.primaryStyleNode);
      this.primaryStyleNode = null;
    }

  }

  private _removeAccentColor() {
    if (this.accentStyleNode) {
      const head = document.getElementsByTagName('head')[0];
      head.removeChild(this.accentStyleNode);
      this.accentStyleNode = null;
    }
  }
  private _removeTitleColor() {
    if (this.titleStyleNode) {
      const head = document.getElementsByTagName('head')[0];
      this.titleStyleNode = head.removeChild(this.titleStyleNode);
      this.titleStyleNode = null;
    }
  }


  private _removeTextColor() {
    if (this.textStyleNode) {
      const head = document.getElementsByTagName('head')[0];
      head.removeChild(this.textStyleNode);
      this.textStyleNode = null;
    }

  }
  private _removeBackgroundColor() {
    if (this.backgroundStyleNode) {
      const head = document.getElementsByTagName('head')[0];
      head.removeChild(this.backgroundStyleNode);
      this.backgroundStyleNode = null;
    }
  }

  changeColors(colors) {
    if (colors && Object.keys(colors)?.length) {
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
    this._removeTitleColor();
    if (colors.title) {
      const style = document.createElement('style');
      style.innerHTML = `#title-color * {
        color: ${colors.title} !important;
      }`;
      this.titleStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
  private _changeBackgroundColor(colors) {
    this._removeBackgroundColor();
    if (colors.background) {
      const style = document.createElement('style');
      style.innerHTML = `#background-color .mat-card, #background-color .mat-chip, #background-color .mat-table,#background-color .mat-paginator, ${this.noCustomBackground}{
        background-color: ${colors.background} !important; filter: brightness(85%); color: ${colors.text || '#fafafa !important'}
      }
      #background-color {
        background-color: ${colors.background};
      }
      `;
      this.backgroundStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
      this._adaptColor(colors);
    }
  }

  private _changePrimaryColor(colors) {
    this._removePrimaryColor();
    if (colors.primary) {
      const style = document.createElement('style');
      style.innerHTML = `
      #background-color .mat-primary:not(.picker-btn):not(.mat-form-field):not(.mat-button):not(.mat-stroked-button):not(.mat-icon):not(.mat-icon-button) {
        background-color: ${colors.primary} !important;
      }
      #background-color .mat-primary.mat-icon-button {
        color: ${colors.primary} !important;
      }`;
      this.primaryStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
      this._adaptColor(colors);
    }
  }
  private _changeAccentColor(colors) {
    this._removeAccentColor();
    if (colors.accent) {
      const style = document.createElement('style');
      style.innerHTML =
        `#background-color .mat-accent:not(.mat-checkbox):not(.mat-icon-button):not(.mat-slide-toggle):not(.mat-spinner):not(.mat-stroked-button)  {
        background-color: ${colors.accent} !important;
      }
      .cdk-overlay-container .mat-accent.mat-raised-button {
        background-color: ${colors.accent} !important;
      }
      #background-color .mat-accent.mat-icon-button {
        color: ${colors.accent} !important;
      }
      `;
      this.accentStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
      this._adaptColor(colors);
    }
  }

  private _changeTextColor(colors) {
    this._removeTextColor();
    const style = document.createElement('style');
    const text = getTextColor(this._getBackgroundColor(colors), this._getTextColor(colors))
    style.innerHTML = `${this.textClassLists.join(', #background-color ')} { color: ${text} !important; }`;
    this.textStyleNode = document.getElementsByTagName('head')[0].appendChild(style);
    this._adaptColor(colors);
  }

  private _adaptColor(colors) {
    this._removeAdaptColor();
    const { primary, accent } = colors;
    const background = this._getBackgroundColor(colors);
    const text = this._getTextColor(colors);
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
    this.adaptColorWithBackgroundNode = document.getElementsByTagName('head')[0].appendChild(style);
  }

  private _getBackgroundColor(colors) {
    return colors.background || this._getDefaultBackgroundColor();
  }

  private _getTextColor(colors) {
    return colors.text || this._getDefaultTextColor();
  }

  private _getDefaultBackgroundColor() {
    return this.isDark ? '#303030' : '#fafafa';
  }

  private _getDefaultTextColor() {
    return this.isDark ? '#fafafa' : '#303030';

  }
}
