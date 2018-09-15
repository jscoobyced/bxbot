import { ChartFactory } from './ChartFactory';

export class CandleChartDrawer {
    private chartData: any[];
    private chartElement: string;
    private chartFactory: ChartFactory;

    public constructor(chartData: any[], chartElement: string, chartFactory?: ChartFactory) {
        this.chartData = chartData;
        this.chartElement = chartElement;
        this.chartFactory = chartFactory ? chartFactory : new ChartFactory();
    }

    public drawChart() {
        if (this.chartData === undefined || this.chartData.length === 0)
            return;
        const data = this.chartFactory.arrayToDataTable(this.chartData);
        if (data === undefined)
            return;

        const options = {
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714' },
                hollowIsRising: true,
                risingColor: { strokeWidth: 0, fill: '#0f9d58' }
            },
            colors: ['black'],
            height: 800,
            legend: 'none',
            series: {
                1: {
                    color: '#FFCDD2',
                    lineWidth: 1,
                    type: 'area'
                },
                2: {
                    color: '#90CAF9',
                    lineWidth: 1,
                    type: 'area'
                },
                3: {
                    lineWidth: 1,
                    type: 'line'
                }
            },
            seriesType: 'candlesticks'
        };

        this.chartFactory.drawCandleChart(data, this.chartElement, options);
    }
}