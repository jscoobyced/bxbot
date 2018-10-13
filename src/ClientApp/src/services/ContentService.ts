import { ContentKey } from './ContentKey';

export class ContentService {

    public static getContent(key: string): string {
        return this.content[key];
    }

    public static init() {
        ContentService.content[ContentKey.WebsiteName] = 'sawan.io';
    }

    private static content: { [key: string]: string; } = {};
}
