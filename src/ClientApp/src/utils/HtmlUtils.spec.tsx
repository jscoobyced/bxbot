import { HtmlUtils } from './HtmlUtils';

describe('HtmlUtils.baseUrl', () => {

    it('return empty string', () => {
        expect(HtmlUtils.baseUrl()).toBe("");
    });
});
