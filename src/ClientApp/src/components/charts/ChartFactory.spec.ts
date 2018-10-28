import { ChartFactory } from './ChartFactory';

test('arrayToDataTable has propery headers when no data', () => {
    const chartFactory = new ChartFactory();
    const result = chartFactory.arrayToDataTable([]);
    expect(result.addColumn).toBeCalledTimes(12);
    expect(result.addRow).toBeCalledTimes(0);
});

test('arrayToDataTable has propery headers when has data', () => {
    const chartFactory = new ChartFactory();
    const result = chartFactory.arrayToDataTable([[1]]);
    expect(result.addRow).toBeCalledTimes(1);
});

test('drawCandleChart can draw', () => {
    const chartFactory = new ChartFactory();
    expect(() => {
        chartFactory.drawCandleChart(new google.visualization.DataTable(), 'Title', {});
    }).not.toThrowError();
});