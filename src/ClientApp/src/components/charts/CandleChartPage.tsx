import * as React from 'react';
import { CandleChart } from './CandleChart';
import { CandleChartDataService } from './CandleChartDataService';
import { CandleChartDrawer } from './CandleChartDrawer';
import { DataFormatter } from './DataFormatter';
import { GoogleChartInitializer } from './GoogleChartInitializer';
import { CandleChartPageState } from './Models';

export class CandleChartPage extends React.Component<any, CandleChartPageState> {
    private static ChartElement: string = "candle_div";
    private candleChart: CandleChartDrawer = new CandleChartDrawer([], "");
    private bollingerSize: number = 20;
    private dataFormatter: DataFormatter = new DataFormatter();
    private chartData: any;

    constructor(props: any, state: CandleChartPageState) {
        super(props, state);
        this.state = { pairings: [], loading: true };
    }

    public componentDidMount() {
        const service = new CandleChartDataService();
        service.fetchCurrencyData(5)
            .then(data => {
                this.chartData = this.dataFormatter.formatBollingerData(data, this.bollingerSize);
                if (!GoogleChartInitializer.IsReady()) {
                    new GoogleChartInitializer().Init(this.drawChart);
                } else {
                    this.drawChart();
                }
            });
    }

    public render(): JSX.Element {
        if (!this.state.loading) {
            this.candleChart.drawChart();
        }
        return <CandleChart
            element={CandleChartPage.ChartElement}
            currency='BTC'
        />;
    }

    private drawChart = () => {
        this.candleChart = new CandleChartDrawer(this.chartData, CandleChartPage.ChartElement);
        this.setState({ loading: false });
    }
}