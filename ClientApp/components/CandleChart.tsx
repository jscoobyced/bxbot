import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { GoogleCharts } from 'google-charts';
import { DateUtil } from '../utils/date';

interface FetchDataState {
    pairings: Pairing[];
    loading: boolean;
}

export class CandleChart extends React.Component<RouteComponentProps<{}>, FetchDataState> {
    private static ChartData: Array<Pairing>;

    constructor() {
        super();
        this.state = { pairings: [], loading: true };

        fetch('api/Data/pairing/1/5')
            .then(response => response.json() as Promise<Pairing[]>)
            .then(data => {
                CandleChart.ChartData = data;
                this.setState({ loading: false });
            });
    }

    public render() {
        let contents: JSX.Element = <span></span>;
        if (this.state.loading) {
            contents = <p><em>Loading...</em></p>
        }
        else {
            GoogleCharts.load(this.drawChart);
        }

        return <div>
            <h1>BTC on bx.in.th</h1>
            <div id="chart_div"></div>
            {contents}
        </div>;
    }

    private drawChart() {
        const rawData: Array<Pairing> = CandleChart.ChartData;
        const formatedData = new Array<any>();
        const lengthToShow = 96;
        const startIndex = Math.max(0, rawData.length - lengthToShow);
        for (let i = startIndex; i < rawData.length; i++) {
            formatedData.push([
                DateUtil.toHumanHours(new Date(rawData[i].timestamp - 7 * 60 * 60 * 1000)),
                rawData[i].low,
                rawData[i].open,
                rawData[i].close,
                rawData[i].high
            ]);
        }
        var data = GoogleCharts.api.visualization.arrayToDataTable(formatedData, true);

        var options = {
            legend: 'none',
            height: 500,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' },
                risingColor: { strokeWidth: 0, fill: '#0f9d58' },
                hollowIsRising: true
            },
            colors: ['black']
        };

        var chart = new GoogleCharts.api.visualization.CandlestickChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
}

interface Pairing {
    timestamp: number;
    low: number;
    high: number;
    close: number;
    open: number;
}