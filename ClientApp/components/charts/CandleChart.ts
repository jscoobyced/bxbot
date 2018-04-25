import { GoogleCharts } from 'google-charts';
import { DateUtil } from '../../utils/DateUtils';
import { Pairing } from './Models';

export class CandleChart {
    private static ChartData: Array<Pairing>;
    private static ChartElement: string;

    public init(chartData: Array<Pairing>, chartElement: string) {
        CandleChart.ChartData = chartData;
        CandleChart.ChartElement = chartElement;
    }

    public resetChart() {
        CandleChart.ChartData = new Array<Pairing>();
    }

    public renderChart() {
        GoogleCharts.load(this.drawChart);
    }

    private drawChart() {
        const formatedData = new Array<any>();
        const lengthToShow = 40;
        const startIndex = Math.max(0, CandleChart.ChartData.length - lengthToShow);
        for (let i = startIndex; i < CandleChart.ChartData.length; i++) {
            formatedData.push([
                DateUtil.toHumanHours(new Date(CandleChart.ChartData[i].timestamp)),
                CandleChart.ChartData[i].low,
                CandleChart.ChartData[i].open,
                CandleChart.ChartData[i].close,
                CandleChart.ChartData[i].high
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

        var chart = new GoogleCharts.api.visualization.CandlestickChart(document.getElementById(CandleChart.ChartElement));

        chart.draw(data, options);
    }

}