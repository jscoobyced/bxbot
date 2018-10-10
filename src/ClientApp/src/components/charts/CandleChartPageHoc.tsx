import * as React from 'react';
import { CandleChartDataService, ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';
import { CandleChartPage } from './CandleChartPage';
import { CandleChartPageData, CandleChartPageProps } from './Models';

export class CandleChartPageHoc extends React.Component<CandleChartPageProps, CandleChartPageData> {

    private readonly service: ICandleChartDataService;

    constructor(props: any, state: any) {
        super(props, state);
        const mode = process.env.mode;
        this.service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();
        this.state = { pairings: [], loading: false, currency: '' };
    }

    public fetchCurrencyData = () => {
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        });
        this.service.fetchCurrencyData(5)
            .then(data => {
                this.setState({
                    pairings: data,
                    currency: 'BTC',
                    loading: false
                });
            });
    }

    public componentDidMount = () => {
        this.fetchCurrencyData();
    }

    public render() {
        return <CandleChartPage
            pairings={this.state.pairings}
            loading={this.state.loading}
            currency={this.state.currency} />;
    }
}