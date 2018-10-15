import * as React from 'react';
import { CandleChartProps } from './Models';

export class CandleChart extends React.Component<CandleChartProps, any> {
    constructor(props: CandleChartProps, state: any) {
        super(props, state);
    }

    public render(): JSX.Element {
        return <div id={this.props.element}></div>;
    }

}
