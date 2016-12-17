import { RecipeHolderPage } from './app.po';

describe('recipe-holder App', function() {
  let page: RecipeHolderPage;

  beforeEach(() => {
    page = new RecipeHolderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
