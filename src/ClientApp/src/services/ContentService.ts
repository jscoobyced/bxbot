import { ContentKey } from './ContentKey';
import { AllContent, Language } from './Models';

export class ContentService {

    private content: Array<{ [key: string]: string; }> = [];

    public updateContent(language: Language): AllContent {
        this.content[language] = {};
        this.content[language][ContentKey.WebsiteName] = 'sawan.io';
        this.content[language][ContentKey.Home] = 'Home';
        this.content[language][ContentKey.About] = 'About';
        this.content[language][ContentKey.CryptoCurrency] = 'Cryptocurrency';
        this.content[language][ContentKey.CandleChart] = 'Candle Chart';
        const date = new Date().getTime() - 3 * 86400000;
        const displayDate = (new Date(date).toISOString().substring(0, 10));
        this.content[language][ContentKey.MainArticleTitle] = `Latest news - ${displayDate}`;
        this.content[language][ContentKey.MainArticle] = 'Grand opening of sawan.io.';

        return this.updateAllContent(language);
    }

    public defaultContent(): AllContent {
        return {
            navigationMenuContent: {
                about: '',
                candleChart: '',
                cryptoCurrency: '',
                home: '',
                websiteName: '',
            },
            homeContent: {
                article: '',
                articleTitle: ''
            }
        };

    }

    private updateAllContent(language: Language): AllContent {
        return {
            navigationMenuContent: {
                about: this.content[language][ContentKey.About],
                candleChart: this.content[language][ContentKey.CandleChart],
                cryptoCurrency: this.content[language][ContentKey.CryptoCurrency],
                home: this.content[language][ContentKey.Home],
                websiteName: this.content[language][ContentKey.WebsiteName],
            },
            homeContent: {
                article: this.content[language][ContentKey.MainArticle],
                articleTitle: this.content[language][ContentKey.MainArticleTitle]
            }
        };
    }
}
