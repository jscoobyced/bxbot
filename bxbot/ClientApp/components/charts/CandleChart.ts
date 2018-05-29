import { ChartFactory } from './ChartFactory';

export class CandleChart {
    private _chartData: Array<any>;
    private _chartElement: string;
    private _chartFactory: ChartFactory;

    public constructor(chartData: Array<any>, chartElement: string) {
        this._chartData = chartData;
        this._chartElement = chartElement;
        this._chartFactory = new ChartFactory();
    }

    public drawChart() {
        const data = this._chartFactory.arrayToDataTable(this._chartData);
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

        this._chartFactory.drawCandleChart(data, this._chartElement, options);
    }
}