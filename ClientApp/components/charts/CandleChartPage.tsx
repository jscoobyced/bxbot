import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { DateUtil } from '../../utils/DateUtils';
import { Pairing, FetchDataState } from './Models';
import { CandleChart } from './CandleChart';
import { GoogleChartInitializer } from './GoogleChartInitializer';
import { BollingerBand } from "../../utils/Bollinger";

export class CandleChartPage extends React.Component<RouteComponentProps<{}>, FetchDataState> {
    private static ChartElement: string = "candle_div";
    private _candleChart: CandleChart = new CandleChart([], "");
    private _bollingerSize: number = 20;

    constructor() {
        super();
        this.state = { pairings: [], loading: true };
    }

    public componentDidMount() {
        fetch('api/Data/pairing/1/5')
            .then(response => response.json() as Promise<Pairing[]>)
            .then(data => {
                this._candleChart = new CandleChart(this.formatData(data), CandleChartPage.ChartElement);
                this.setState({ loading: false || !GoogleChartInitializer.IsReady() });
            });
    }

    private formatData(chartData: Array<Pairing>): Array<any> {
        const lengthToShow = 100;
        const startIndex = Math.max(0, chartData.length - lengthToShow);
        const bollingerStartIndex = Math.max(0, chartData.length - (this._bollingerSize + lengthToShow));
        const formatedData = new Array<any>();
        const closePrice = new Array<any>();
        for (let i = bollingerStartIndex; i < chartData.length; i++) {
            closePrice.push(chartData[i].close);
        }

        const bollingerBand = new BollingerBand().bb(closePrice);
        let bollingerBandIndex = this._bollingerSize - 1;
        for (let i = startIndex; i < chartData.length; i++) {
            formatedData.push([
                DateUtil.toHumanHours(new Date(chartData[i].timestamp)),
                chartData[i].low,
                chartData[i].open,
                chartData[i].close,
                chartData[i].high,
                bollingerBand.lower[bollingerBandIndex],
                bollingerBand.upper[bollingerBandIndex],
                bollingerBand.mid[bollingerBandIndex]
            ]);
            bollingerBandIndex++;
        }

        return formatedData;
    }

    public render(): JSX.Element {
        let contents: JSX.Element = <span></span>;
        if (this.state.loading) {
            contents = <p><em>Loading...</em></p>
        }
        else {
            this._candleChart.drawChart();
        }

        return <div>
            <h1>BTC on bx.in.th</h1>
            <div id={CandleChartPage.ChartElement}></div>
            {contents}
        </div>;
    }
}