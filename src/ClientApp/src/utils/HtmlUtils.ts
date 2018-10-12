export class HtmlUtils {

    public static readonly baseUrl = (): string => {

        const base = HtmlUtils.getFirstElementsByTagName('base');

        if (!base) {
            return "";
        }

        const baseUrl = base.getAttribute('href');

        if (!baseUrl) {
            return "";
        }

        return baseUrl;
    }

    public static readonly getFirstElementsByTagName = (tagName: string): Element | null => {
        if (!document) {
            return null;
        }

        const elements = document.getElementsByTagName(tagName);
        if (!elements || elements.length === 0) {
            return null;
        }

        return elements[0];
    }
}
