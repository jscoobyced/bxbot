export class ChartFactory {
    public arrayToDataTable(data: any[]): google.visualization.DataTable {
        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Date/Time');
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'string', role: 'annotation' });
        chartData.addColumn({ type: 'string', role: 'annotationText' });
        chartData.addColumn({ type: 'number', role: 'data' });
        chartData.addColumn({ type: 'string', role: 'annotation' });
        chartData.addColumn({ type: 'string', role: 'annotationText' });
        chartData.addColumn({ type: 'number', role: 'data' });
        data.forEach(row => {
            chartData.addRow(row);
        });
        return chartData;
    }

    public drawCandleChart(data: google.visualization.DataTable, chartElement: string, options: any) {
        const chart = new google.visualization.ComboChart(document.getElementById(chartElement) as Element);
        chart.draw(data, options);
    }
}
