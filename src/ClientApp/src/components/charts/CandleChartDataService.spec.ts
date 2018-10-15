import { TestData, TestUtils } from '../../../tests/TestUtils';
import { CandleChartDataService } from './CandleChartDataService';

const testData: TestData[] = [
    {
        input: '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]',
        expected: '{"currency": "", "currencyOptions": [], "pairings": [{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]}',
        executed: [1]
    },
    {
        input: undefined,
        expected: {currency: "", currencyOptions: [], pairings: []},
        executed: [0] }
];

test('fetchCurrencyData()', async () => {

    for (const data of testData) {
        window.fetch = TestUtils.mockFetch(data.expected);

        const service = new CandleChartDataService();
        const result = await service.fetchCurrencyData(data.input);

        expect(result).toEqual(data.expected);
        expect(window.fetch).toHaveBeenCalledTimes(data.executed[0]);
    }
});

test('Error fetchCurrencyData()', async () => {

    const errorMessage = 'Expect to fail';
    window.fetch = TestUtils.mockErrorFetch(errorMessage);

    const service = new CandleChartDataService();
    let errorThrown: Error = new Error();
    try {
        await service.fetchCurrencyData(0);
    } catch (error) {
        errorThrown = error;
    }

    expect(errorThrown.message).toEqual(errorMessage);
    expect(window.fetch).toThrow();
});

test('Not OK fetchCurrencyData()', async () => {

    const errorMessage = 'Expect to fail';
    window.fetch = TestUtils.mockFetchNotOk(errorMessage);

    const service = new CandleChartDataService();
    let errorThrown: Error = new Error();
    try {
        await service.fetchCurrencyData(0);
    } catch (error) {
        errorThrown = error;
    }

    expect(errorThrown.message).toEqual(errorMessage);
});