import { ContentService } from "./ContentService";
import { Language } from "./Models";

test('ContentServic can get default content', () => {
    const contentService = new ContentService();
    expect(contentService.defaultContent()).not.toBeNull();
    expect(contentService.defaultContent().homeContent).not.toBeNull();
    expect(contentService.defaultContent().homeContent.article).toEqual('');
});

test('ContentService can get english content', () => {
    const contentService = new ContentService();
    const englishContent = contentService.updateContent(Language.English);
    expect(englishContent).not.toBeNull();
    expect(englishContent.navigationMenuContent.about).toEqual('About');
});
