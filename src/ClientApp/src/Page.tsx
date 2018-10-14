import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { Home } from './components/main/Home';
import { Layout } from './components/main/Layout';
import { ContentService } from './services/ContentService';
import { AllContent, Language } from './services/Models';
import { HtmlUtils } from './utils/HtmlUtils';

export interface PageState {
    allContent: AllContent;
}

export class Page extends React.Component<{}, PageState> {

    private contentService: ContentService;

    public constructor(props: any) {
        super(props);
        this.contentService = new ContentService();
        this.state = { allContent: this.contentService.defaultContent() };
    }

    public componentDidMount() {
        const allContent = this.updateContent(Language.English);
        this.setState({ allContent });
    }

    public render() {
        const routes = <Layout allContent={this.state.allContent} >
            <Route exact path='/' component={() => <Home homeContent={this.state.allContent.homeContent} />} />
            <Route path='/candle' component={CandleChartPageHoc} />
        </Layout>;
        return <BrowserRouter children={routes} basename={HtmlUtils.baseUrl()} />;
    }

    private updateContent(language: Language): AllContent {
        return this.contentService.updateContent(language);
    }
}