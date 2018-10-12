import { TestUtils } from '../../../tests/TestUtils';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';

test('CandleChartDataServiceMock is valid', async () => {

    const expected = '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]';
    window.fetch = TestUtils.mockFetch(expected);

    const candleChartDataServiceMock = new CandleChartDataServiceMock();
    const result = await candleChartDataServiceMock.fetchCurrencyData(1);
    console.log(result);
    expect(result).toEqual(expected);

});