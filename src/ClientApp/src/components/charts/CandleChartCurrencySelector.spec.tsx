import { shallow } from 'enzyme';
import * as React from 'react';
import { TestUtils } from '../../../tests/TestUtils';
import { SelectOption } from '../Models';
import { CandleChartCurrencySelector } from './CandleChartCurrencySelector';
import { CandleChartPageHoc } from './CandleChartPageHoc';

test('CandleChartCurrencySelector snapshot', () => {
    const data: SelectOption[][] = [
        [],
        [{
            value: 1,
            text: 'THB/BTC'
        }]
    ];

    data.map(expected => {
        const candleChartCurrencySelector = shallow(<CandleChartCurrencySelector
            currencyOptions={expected}
            onChangeCurrency={() => { return; }} />);
        expect(candleChartCurrencySelector).toMatchSnapshot();
    });
});

test('CandleChartCurrencySelector onChangeCurrency', () => {
    window.fetch = TestUtils.mockFetch(
        '[{"timestamp":1,"low":1.0,"high":1.0,"open":1.0,"close":1.0,"current":1.0,"volume":0.0}]');
    const onChangeCurrency = new CandleChartPageHoc({}, {}).onChangeCurrency;
    const candleChartCurrencySelector = shallow(<CandleChartCurrencySelector
        currencyOptions={[]}
        onChangeCurrency={onChangeCurrency} />);
    candleChartCurrencySelector
        .find('#currencySelector')
        .simulate('change', { target: { value: '25' }, preventDefault: () => { return; } });
    expect(window.fetch).toHaveBeenCalledTimes(1);

});