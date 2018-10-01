import { HtmlUtils } from './HtmlUtils';

describe('HtmlUtils.baseUrl', () => {

    it('returns / when base value is /', () => {
        document.getElementsByTagName = mockGetElementByTagName('/');
        expect(HtmlUtils.baseUrl()).toBe("/");
    });

    it('returns empty string when document has no "base" tag', () => {
        document.getElementsByTagName = mockGetElementByTagName('', true);
        expect(HtmlUtils.baseUrl()).toBe("");
    });

    it('returns empty string when "base" tag is empty', () => {
        document.getElementsByTagName = mockGetElementByTagName('', true);
        expect(HtmlUtils.baseUrl()).toBe("");
    });

    it('returns empty string when base URL is undefined', () => {
        document.getElementsByTagName = mockGetElementByTagName("", false, true);
        expect(HtmlUtils.baseUrl()).toBe("");
    });

    it('returns empty string when base URL is null', () => {
        document.getElementsByTagName = mockGetElementByTagName(null);
        expect(HtmlUtils.baseUrl()).toBe("");
    });

    it('returns empty string when base URL is empty string', () => {
        document.getElementsByTagName = mockGetElementByTagName("");
        expect(HtmlUtils.baseUrl()).toBe("");
    });
});

function mockGetElementByTagName(value: any, noBase = false, noLength = false) {
    return jest.fn().mockImplementation(() => {
        if (noBase) {
            return undefined;
        }

        if (noLength) {
            return [];
        }

        return [{
            getAttribute: () => {
                return value;
            }
        }];
    });
}
