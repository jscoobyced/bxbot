import { TestData } from '../../tests/TestUtils';
import { CandleChartDrawer } from './CandleChartDrawer';
import { ChartFactory } from './ChartFactory';

const testData: TestData[] = [
    { input: [], expected: [], executed: [0, 0] },
    { input: [1], expected: [], executed: [1, 1] },
    { input: [1], expected: undefined, executed: [1, 0] }
];

test('drawChart()', () => {
    const chartFactory: ChartFactory = new ChartFactory();

    for (const data of testData) {
        chartFactory.arrayToDataTable = jest.fn().mockImplementation(() => {
            return data.expected;
        });
        chartFactory.drawCandleChart = jest.fn().mockImplementation(() => {
            // Draw stuff
        });

        const candleChartDrawer: CandleChartDrawer = new CandleChartDrawer(data.input, 'test', chartFactory);
        candleChartDrawer.drawChart();
        expect(chartFactory.arrayToDataTable).toHaveBeenCalledTimes(data.executed[0]);
        expect(chartFactory.drawCandleChart).toHaveBeenCalledTimes(data.executed[1]);

    }
});