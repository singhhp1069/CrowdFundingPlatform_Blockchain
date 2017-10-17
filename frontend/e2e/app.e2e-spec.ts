import { Blockchain4.0Page } from './app.po';

describe('blockchain4.0 App', () => {
  let page: Blockchain4.0Page;

  beforeEach(() => {
    page = new Blockchain4.0Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
