import * as React from 'react';
import { CandleChartPage } from './CandleChartPage';
import { CandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';

const mode = process.env.mode;
const service = mode === 'development' ? new CandleChartDataServiceMock() : new CandleChartDataService();

export class CandleChartPageHoc extends React.Component {


    public render() {
        return <CandleChartPage candleChartDataService={service} />
    }
}