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
        this.state = {
            pairings: [],
            loadingCurrencyData: false,
            loadingCurrencies: false,
            currency: '',
            currencyOptions: []
        };
    }

    public readonly fetchCurrencyData = (currencyId: number) => {
        if (this.state.loadingCurrencyData) {
            return;
        }
        this.setState({
            loadingCurrencyData: true
        });
        this.service.fetchCurrencyData(currencyId)
            .then(data => {
                this.setState({
                    pairings: data,
                    loadingCurrencyData: false
                });
            });
    }

    public readonly fetchCurrencies = () => {
        if (this.state.loadingCurrencies) {
            return;
        }
        this.setState({
            loadingCurrencies: true
        });
        this.service.fetchCurrencies()
            .then(data => {
                this.setState({
                    currencyOptions: data,
                    loadingCurrencies: false
                });
            });
    }

    public componentDidMount = () => {
        this.fetchCurrencies();
        this.fetchCurrencyData(this.defaultCurrencyId);
    }

    public render() {
        return <article>
            <CandleChartCurrencySelector
                onChangeCurrency={this.onChangeCurrency}
                currencyOptions={this.state.currencyOptions} />
            <CandleChartComponent
                pairings={this.state.pairings}
                loading={this.state.loadingCurrencyData}
                currency={this.state.currency} />
        </article>;
    }

    public readonly onChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        let currencyId = this.defaultCurrencyId;
        if (event.target.value) {
            currencyId = parseInt(event.target.value, 10);
        }
        this.fetchCurrencyData(currencyId);
    }
}
