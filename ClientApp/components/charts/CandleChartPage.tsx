import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Pairing, FetchDataState } from './Models';
import { CandleChart } from './CandleChart';

export class CandleChartPage extends React.Component<RouteComponentProps<{}>, FetchDataState> {

    private _candleChart: CandleChart = new CandleChart();
    private _chartElement: string = "candle_div"

    constructor() {
        super();
        this.state = { pairings: [], loading: true };
    }

    public componentDidMount() {
        fetch('api/Data/pairing/1/5')
            .then(response => response.json() as Promise<Pairing[]>)
            .then(data => {
                this._candleChart.init(data, this._chartElement);
                this.setState({ loading: false });
            });
    }

    public render() {
        let contents: JSX.Element = <span></span>;
        if (this.state.loading) {
            contents = <p><em>Loading...</em></p>
        }
        else {
            this._candleChart.renderChart();
        }

        return <div>
            <h1>BTC on bx.in.th</h1>
            <div id={this._chartElement}></div>
            {contents}
        </div>;
    }
}