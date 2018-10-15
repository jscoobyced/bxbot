import { shallow } from 'enzyme';
import * as React from 'react';
import { TestUtils } from '../../../tests/TestUtils';
import { CandleChartPageHoc } from './CandleChartPageHoc';

test('CandleChartPageHoc snapshot for currency 5.', () => {
    window.fetch = TestUtils.mockFetch(
        '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]');
    const candleChartPageHoc = shallow(<CandleChartPageHoc />);
    expect(candleChartPageHoc).toMatchSnapshot();
});
