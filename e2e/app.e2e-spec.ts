import { DiceAnimPage } from './app.po';

describe('dice-anim App', () => {
  let page: DiceAnimPage;

  beforeEach(() => {
    page = new DiceAnimPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
