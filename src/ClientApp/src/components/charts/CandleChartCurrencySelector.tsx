import * as React from 'react';
import { CandleChartCurrencyProps } from './Models';

export class CandleChartCurrencySelector extends React.Component<CandleChartCurrencyProps> {

    public constructor(props: CandleChartCurrencyProps) {
        super(props);
    }

    public render() {
        return <select id='currencySelector'
                        onChange={this.props.onChangeCurrency}>
            {
                this.props.currencyOptions && this.props.currencyOptions.map((selectOption, key) => {
                    return <option key={key} value={selectOption.value}>{selectOption.text}</option>;
                })
            }
        </select>;
    }
}
