import { AppPage } from './app.po';
import { browser, logging, By } from 'protractor';

const username = 'userTest' + Math.round(Math.random() * 100000);
const blogName = 'blogTest' + Math.round(Math.random() * 100000);
const postTitle = 'title' + + Math.round(Math.random() * 100000);
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('Community App', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  describe('Homepage', () => {

    it('should open base url', async () => {
      await page.navigateTo();
      expect(await page.getLocation()).toBe(browser.baseUrl);
    });
    it('should HomeComponent exist', () => {
      expect(page.isExist('app-home')).toBeTruthy();
    });
    it('should open login dialog', async () => {
      await page.clickOn('.header__user');
      await page.clickOn('#loginBtn');
      expect(await page.isExist('#loginClick')).toBeTruthy();
      expect(await page.isExist('#registerClick')).toBeTruthy();
    });

    it('should click on register button and navigate', async () => {
      await page.clickOn('#registerClick');
      await browser.waitForAngular();
      expect(await page.getLocation()).toBe(browser.baseUrl + 'auth/register');
    });
    describe('Register Page', () => {
      it('should appear title', async () => {
        expect(await page.getText('mat-card-title')).toBe('ثبت‌نام');
      });
      it('should fill the username', async () => {
        const selector = '#username';
        await page.typeOn(selector, username);
        expect(page.getValue(selector)).toBe(username);
      });
      it('should fill the email', async () => {
        const selector = '#email';
        const value = `${username}@test.com`;
        await page.typeOn(selector, value);
        expect(page.getValue(selector)).toBe(value);
      });
      it('should fill the password', async () => {
        const selector = '#password';
        const value = 'passw0rd';
        await page.typeOn(selector, value);
        expect(page.getValue(selector)).toBe(value);
      });

      it('should fill the passwordConfirm', async () => {
        const selector = '#passwordConfirm';
        const value = 'passw0rd';
        await page.typeOn(selector, value);
        expect(page.getValue(selector)).toBe(value);
      });

      it('should check the agreement', async () => {
        const selector = '#acceptRules';
        await page.clickOn(selector);
        expect(await page.getElement('input[type="checkbox"]').isSelected()).toBeTruthy();
      });
      it('should click on register button', async () => {
        const selector = '#register';
        await page.clickOn(selector);
        await browser.waitForAngular();
        expect(await page.getLocation()).toBe(browser.baseUrl);
      });
      it('should already logged in', async () => {
        await page.clickOn('.header__user');
        expect(await page.isExist('#loginBtn')).not.toBeTruthy();
        expect(await page.isExist('#logout')).toBeTruthy();
      });
    });

    describe('Create a Blog', () => {
      it('should navigate to create blog page', async () => {
        await page.clickOn('#createBlog');
        await browser.waitForAngular();
        expect(page.getLocation()).toBe(browser.baseUrl + 'b/new');
      });

      it('should appear title', async () => {
        expect(await page.getText('mat-card-title')).toBe('ساخت بلاگ جدید');
      });

      it('should fill social name', async () => {
        await page.typeOn('#sname', blogName);
        expect(page.getValue('#sname')).toBe(blogName);
      });
      it('should fill social title', async () => {
        await page.typeOn('#title', blogName);
        expect(page.getValue('#title')).toBe(blogName);
      });
      it('should fill social description', async () => {
        const value = `this is a description for blog ${blogName}. TEST PURPOSE ONLY`;
        await page.typeOn('#description', value);
        expect(page.getValue('#description')).toBe(value);
      });
      it('should select the subject', async () => {
        const optionElement = browser.element(By.cssContainingText('mat-option .mat-option-text', 'برنامه نویسی'));
        await page.clickOn('#select-subject');
        await optionElement.click();
        await browser.waitForAngular();
        expect(await page.getText('#select-subject .mat-select-value-text span')).toBe('برنامه نویسی');
      });
      it('should click on create and navigate to blog page', async () => {
        await page.clickOn('#createClick');
        await browser.waitForAngular();
        expect(await page.getLocation()).toBe(`${browser.baseUrl}b/${blogName}`);
      });
      it(`should show title of the blog with ${blogName}`, async () => {
        expect(await page.getText('#blogTitle')).toBe(blogName);
      });
    });

    describe('Create Post', () => {
      // TODO
      it('should click on create post and navigate', async () => {
        expect(await page.isExist('[name="createPost"]')).toBeTruthy();
        await page.clickOn('[name="createPost"]');
        expect(await page.getLocation()).toBe(`${browser.baseUrl}b/${blogName}/new`);
      });
      it('should fill post title', async () => {
        await page.typeOn('#title', postTitle);
        expect(await page.getValue('#title')).toBe(postTitle);
      });
      it('should fill post subtitle', async () => {
        await page.typeOn('#subtitle', 'subtitle');
        expect(await page.getValue('#subtitle')).toBe('subtitle');
      });
      it('should fill post text', async () => {
        await page.clickOn('ckeditor');
        await page.typeOn('.ck.ck-content', lorem);
        expect(await page.getText('.ck.ck-content')).toBe(lorem);
      });
      it('click on publish post and navigate to blog main page', async () => {
        await page.clickOn('[name="publishClick"]');
        expect(await page.getLocation()).toBe(`${browser.baseUrl}b/${blogName}`);
      });
    });
    describe('Logout', () => {
      it('should logout from webapp', async () => {
        await page.clickOn('.header__user');
        await page.clickOn('#logout');
        await page.clickOn('.header__user');
        expect(await page.isExist('#loginBtn')).toBeTruthy();
        expect(await page.isExist('#logout')).not.toBeTruthy();
      });
    });
  });
});
