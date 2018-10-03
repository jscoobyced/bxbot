import * as React from 'react';
import { CandleChartPage } from './CandleChartPage';
import { CandleChartDataService, ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';
import { Pairing, CandleChartPageData } from './Models';

export class CandleChartPageHoc extends React.Component<{}, CandleChartPageData> {

    private readonly service: ICandleChartDataService;

    constructor(props: any, state: any) {
        super(props, state);
        const mode = process.env.mode;
        this.service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();
        this.state = { pairings: [] }
    }

    public componentDidMount = () => {
        this.service.fetchCurrencyData(5)
            .then(data => {
                this.setState({ pairings: data });
            });
    }


    public render() {
        return <CandleChartPage pairings={this.state.pairings} />
    }
}