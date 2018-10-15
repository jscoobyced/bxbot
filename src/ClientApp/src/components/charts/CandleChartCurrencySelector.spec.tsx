import { shallow } from 'enzyme';
import * as React from 'react';
import { CandleChartCurrencySelector } from './CandleChartCurrencySelector';
import { SelectOption } from '../Models';

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
    })

});

test('CandleChartCurrencySelector onChangeCurrency', () => {
    const onChangeCurrency = jest.fn().mockImplementation(() => {
        return;
    });
    const candleChartCurrencySelector = shallow(<CandleChartCurrencySelector
        currencyOptions={[]}
        onChangeCurrency={onChangeCurrency} />);
    candleChartCurrencySelector
        .find('#currencySelector')
        .simulate('change', { target: { value: '25' }, preventDefault: () => { return; } });
    expect(onChangeCurrency).toHaveBeenCalledTimes(1);

});