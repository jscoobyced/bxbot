export enum Language {
    English,
    French
}

export interface AllContent {
    navigationMenuContent: NavigationMenuContent;
    homeContent: HomeContent;
}

export interface NavigationMenuContent {
    home: string;
    websiteName: string;
    cryptoCurrency: string;
    candleChart: string;
    about: string;
}

export interface HomeContent {
    articleTitle: string;
    article: string;
}