import { browser, by, element } from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }

<<<<<<< HEAD
  public getTitleText() {
    return element(by.css('app-root h1')).getText();
||||||| 78f8bcb
  getTitleText() {
    return element(by.css('app-root h1')).getText();
=======
  public getTitleText() {
    return element(by.css('ncov-root h1')).getText();
>>>>>>> 0998a2016db9c52eff3364c781d66491a3b00f51
  }
}
