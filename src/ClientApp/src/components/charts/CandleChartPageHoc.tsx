import * as React from 'react';
import { CandleChartDataService, ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';
import { CandleChartPage } from './CandleChartPage';
import { CandleChartPageData, CandleChartPageProps } from './Models';

export class CandleChartPageHoc extends React.Component<{}, CandleChartPageData> {

    private readonly service: ICandleChartDataService;
    private readonly defaultCurrencyId = 1;

    constructor(props: any, state: any) {
        super(props, state);
        const mode = process.env.mode;
        this.service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();
        this.state = { pairings: [], loading: false, currency: '' };
    }

    public fetchCurrencyData = (currencyId: number) => {
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        });
        this.service.fetchCurrencyData(currencyId)
            .then(data => {
                this.setState({
                    pairings: data,
                    currency: 'BTC',
                    loading: false
                });
            });
    }

    public componentDidMount = () => {
        this.fetchCurrencyData(this.defaultCurrencyId);
    }

    public render() {
        return <div>
            <select onChange={this.onChangeCurrency}>
                <option value='1'>THB/BTC</option>
                <option value='25'>THB/XRP</option>
                <option value='27'>THB/BCH</option>
                <option value='29'>THB/XZC</option>
            </select>
            <CandleChartPage
                pairings={this.state.pairings}
                loading={this.state.loading}
                currency={this.state.currency} />
        </div>;
    }

    private readonly onChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        let currencyId = this.defaultCurrencyId;
        if (event.target.value) {
            currencyId = parseInt(event.target.value, 10);
        }
        this.fetchCurrencyData(currencyId);
    }
}
