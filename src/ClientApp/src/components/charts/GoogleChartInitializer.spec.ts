import { GoogleChartInitializer } from './GoogleChartInitializer';

test('GoogleChartInitializer can initialize and only once', () => {
    expect(GoogleChartInitializer.IsReady()).toBeFalsy();

    const initializer = new GoogleChartInitializer();
    expect(initializer.Init(() => { return; })).toBeTruthy();
    expect(initializer.Init(() => { return; })).toBeFalsy();

    expect(GoogleChartInitializer.IsReady()).toBeFalsy();
});