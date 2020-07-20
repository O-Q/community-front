import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  EC = protractor.ExpectedConditions;
  navigateTo(url = browser.baseUrl) {
    return browser.get(url) as Promise<any>;
  }
  getLocation() {
    return browser.getCurrentUrl() as Promise<string>;
  }

  isExist(selector: string) {
    return this.getElement(selector).isPresent() as Promise<boolean>;
  }
  getValue(selector: string) {
    return this.getElement(selector).getAttribute('value') as Promise<string>;
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getText(selector: string) {
    return this.getElement(selector).getText() as Promise<string>;
  }
  typeOn(selector: string, text: string) {
    return this.getElement(selector).sendKeys(text) as Promise<void>;
  }

  clickOn(selector: string) {
    return this.getElement(selector).click() as Promise<void>;
  }
}
