import { GoogleCharts } from 'google-charts';

export class CandleChart {
    private _chartData: Array<any>;
    private _chartElement: string;

    public constructor(chartData: Array<any>, chartElement: string) {
        this._chartData = chartData;
        this._chartElement = chartElement;
    }

    public drawChart() {
        const data: Array<any> = GoogleCharts.api.visualization.arrayToDataTable(this._chartData, true);
        const options = {
            legend: 'none',
            height: 800,
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' },
                risingColor: { strokeWidth: 0, fill: '#0f9d58' },
                hollowIsRising: true
            },
            colors: ['black'],
            seriesType: 'candlesticks',
            series: {
                1: {
                    type: 'area',
                    lineWidth: 1,
                    color: '#FFCDD2'
                },
                2: {
                    type: 'area',
                    lineWidth: 1,
                    color: '#90CAF9'
                },
                3: {
                    type: 'line',
                    lineWidth: 1
                }
            }
        };

        const chart = new GoogleCharts.api.visualization.CandlestickChart(document.getElementById(this._chartElement));

        chart.draw(data, options);
    }
}