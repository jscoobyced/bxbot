import { } from 'google.visualization';

export class ChartFactory {
    public arrayToDataTable(data: Array<number>): google.visualization.DataTable {
        return google.visualization.arrayToDataTable(data, true);
    }

    public drawCandleChart(data: google.visualization.DataTable, chartElement: string, options: any) {
        const chart = new google.visualization.CandlestickChart(document.getElementById(chartElement) as Element);
        chart.draw(data, options);
    }
}