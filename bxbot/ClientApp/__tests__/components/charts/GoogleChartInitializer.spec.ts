import { } from 'jest';
import { GoogleChartInitializer } from '../../../components/charts/GoogleChartInitializer';

describe('Google Chart Initializer', () => {
    let googleInitializer = new GoogleChartInitializer();

    test('initialize', () => {
        expect(googleInitializer.Init(() => { })).toBeTruthy();
    })

    test('default ready value', () => {
        expect(GoogleChartInitializer.IsReady()).toBeFalsy();
    })
})