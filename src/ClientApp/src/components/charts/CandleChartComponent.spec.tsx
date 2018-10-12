import { shallow } from 'enzyme';
import * as React from 'react';
import { CandleChartComponent } from './CandleChartComponent';
import { Pairing } from './Models';

test('CandleChartComponent isn\'t changed when empty', () => {
    const candleChartComponent = shallow(<CandleChartComponent pairings={[]} currency={'BTC'} loading={false} />);
    expect(candleChartComponent).toMatchSnapshot();
});

test('CandleChartComponent isn\'t changed when not empty', () => {
    const pairings: Pairing[] = [{ close: 0, high: 0, low: 0, open: 0, timestamp: 0 }];
    const candleChartComponent = shallow(<CandleChartComponent pairings={[]} currency={'BTC'} loading={false} />);
    candleChartComponent.setProps({ pairings: pairings });
    expect(candleChartComponent).toMatchSnapshot();
});