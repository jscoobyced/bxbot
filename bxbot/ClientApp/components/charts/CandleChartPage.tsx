import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { DateUtil } from '../../utils/DateUtils';
import { Pairing, FetchDataState } from './Models';
import { CandleChart } from './CandleChart';
import { GoogleChartInitializer } from './GoogleChartInitializer';
import { BollingerBand } from "../../utils/Bollinger";
import { DataFormatter } from './DataFormatter';

export class CandleChartPage extends React.Component<RouteComponentProps<{}>, FetchDataState> {
    private static ChartElement: string = "candle_div";
    private _candleChart: CandleChart = new CandleChart([], "");
    private _bollingerSize: number = 20;
    private _dataFormatter: DataFormatter = new DataFormatter();
    private _chartData: any;

    constructor() {
        super();
        this.state = { pairings: [], loading: true, url: 'api/Data/pairing/1/5' };
    }

    public componentDidMount() {
        fetch(this.state.url)
            .then(response => response.json() as Promise<Pairing[]>)
            .then(data => {
                this._chartData = this._dataFormatter.formatBollingerData(data, this._bollingerSize);
                if (!GoogleChartInitializer.IsReady()) {
                    new GoogleChartInitializer().Init(this.drawChart);
                } else {
                    this.drawChart();
                }
            });
    }

    private drawChart = () => {
        this._candleChart = new CandleChart(this._chartData, CandleChartPage.ChartElement);
        this.setState({ loading: false });
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