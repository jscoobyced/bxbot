import { TestUtils } from '../../../tests/TestUtils';
import { CandleChartDataServiceMock } from './CandleChartDataServiceMock';

test('CandleChartDataServiceMock can fetchCurrencyData', async () => {

    const expected = '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]';
    window.fetch = TestUtils.mockFetch(expected);

    const candleChartDataServiceMock = new CandleChartDataServiceMock();
    const result = await candleChartDataServiceMock.fetchCurrencyData(1);
    expect(result).toEqual(expected);

});

test('CandleChartDataServiceMock can fetchCurrencies', async () => {

    const expected = '{"1":{"pairing_id": "1","primary_currency": "THB",\
    "secondary_currency": "BTC","primary_min": "10.00000000","secondary_min": "0.00050000", "active": true}}';
    window.fetch = TestUtils.mockFetch(expected);

    const candleChartDataServiceMock = new CandleChartDataServiceMock();
    const result = await candleChartDataServiceMock.fetchCurrencies();
    expect(result).toEqual(expected);

});
