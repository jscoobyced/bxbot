import { ChartFactory } from '../../../components/charts/ChartFactory';
import { CandleChart } from '../../../components/charts/CandleChart';
import { } from 'jest';

jest.mock('../../../components/charts/ChartFactory');

describe('CandleChart component', () => {

    it('can create an instance', () => {
        let chart = new CandleChart([], '');
        chart.drawChart();
        expect(ChartFactory).toHaveBeenCalledTimes(1);
    })
});
