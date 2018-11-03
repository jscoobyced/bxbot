import { ContentKey } from './ContentKey';
import { AllContent, Language } from './Models';

export class ContentService {

    private readonly content: Array<{ [key: string]: string; }> = [];

    public updateContent(language: Language): AllContent {
        this.content[language] = {};
        this.content[language][ContentKey.WebsiteName] = 'bxbot';
        this.content[language][ContentKey.Home] = 'Home';
        this.content[language][ContentKey.About] = 'About';
        this.content[language][ContentKey.CryptoCurrency] = 'Crypto-currency';
        this.content[language][ContentKey.CandleChart] = 'Candle Chart';
        const date = '2018-10-14';
        const displayDate = (new Date(date).toISOString().substring(0, 10));
        this.content[language][ContentKey.MainArticleTitle] = `Latest news - ${displayDate}`;
        this.content[language][ContentKey.MainArticle] = 'Opening of bxbot. This website is a'
            + ' demo of ReactJS and netcore 2.1, and includes a Google Chart based crypto-currency'
            + ' trend and simple analysis. This website is my training material and might not work'
            + ' as you expect. Use it for education purpose, not as a trading tool.';

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
