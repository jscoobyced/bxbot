export class HtmlUtils {

    public static readonly baseUrl = (): string => {
        if (!document) {
            return "";
        }

        const bases = document.getElementsByTagName('base');
        if (!bases || bases.length === 0 || !bases[0]) {
            return "";
        }

        const baseUrl = bases[0].getAttribute('href');
        if (baseUrl === null || typeof baseUrl === undefined) {
            return baseUrl + "";
        }

        return "";
    }
}
