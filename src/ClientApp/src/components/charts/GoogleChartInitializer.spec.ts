import { GoogleChartInitializer } from './GoogleChartInitializer';

test('GoogleChartInitializer can initialize and only once', () => {
    expect(GoogleChartInitializer.IsReady()).toBeFalsy();

    const initializer = new GoogleChartInitializer();
    expect(initializer.Init(() => { })).toBeTruthy();
    expect(initializer.Init(() => { })).toBeFalsy();

    expect(GoogleChartInitializer.IsReady()).toBeFalsy();
});