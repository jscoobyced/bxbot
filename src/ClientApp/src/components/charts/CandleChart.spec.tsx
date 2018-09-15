import { shallow } from 'enzyme';
import * as React from 'react';
import { CandleChart } from './CandleChart';

test('CandleChart component is unchanged.', () => {
    const chart = shallow(<CandleChart currency='BTC' element='candle_div'/>);
    expect(chart).toMatchSnapshot();
});