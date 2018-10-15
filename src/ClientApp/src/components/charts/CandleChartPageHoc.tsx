import * as React from 'react';
import { SelectOption } from '../Models';
import { CandleChartComponent } from './CandleChartComponent';
import { CandleChartCurrencySelector } from './CandleChartCurrencySelector';
import { CandleChartDataService, ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';
import { CandleChartPageData } from './Models';

export class CandleChartPageHoc extends React.Component<{}, CandleChartPageData> {

    private readonly service: ICandleChartDataService;
    private readonly defaultCurrencyId = 1;

    constructor(props: any, state: any) {
        super(props, state);
        const mode = process.env.mode;
        this.service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();
        this.state = { pairings: [], loading: false, currency: '', currencyOptions: [] };
    }

    public readonly fetchCurrencyData = (currencyId: number) => {
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        });
        this.service.fetchCurrencyData(currencyId)
            .then(data => {
                this.setState({
                    pairings: data.pairings,
                    currency: data.currency,
                    currencyOptions: data.currencyOptions,
                    loading: false
                });
            });
    }

    public componentDidMount = () => {
        this.fetchCurrencyData(this.defaultCurrencyId);
    }

    public render() {
        return <article>
            <CandleChartCurrencySelector
                onChangeCurrency={this.onChangeCurrency}
                currencyOptions={this.state.currencyOptions} />
            <CandleChartComponent
                pairings={this.state.pairings}
                loading={this.state.loading}
                currency={this.state.currency} />
        </article>;
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
