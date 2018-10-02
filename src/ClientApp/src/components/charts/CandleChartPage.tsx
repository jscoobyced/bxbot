import * as React from 'react';
import { CandleChart } from './CandleChart';
import { ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDrawer } from './CandleChartDrawer';
import { DataFormatter } from './DataFormatter';
import { GoogleChartInitializer } from './GoogleChartInitializer';
import { CandleChartPageState, CandleChartPageProps } from './Models';

export class CandleChartPage extends React.Component<CandleChartPageProps, CandleChartPageState> {
    private static readonly ChartElement = "candle_div";
    private candleChart: CandleChartDrawer = new CandleChartDrawer([], "");
    private readonly bollingerSize = 20;
    private readonly dataFormatter: DataFormatter = new DataFormatter();
    private chartData: any;
    private readonly service: ICandleChartDataService;

    constructor(props: CandleChartPageProps, state: CandleChartPageState) {
        super(props, state);
        this.service = props.candleChartDataService;
        this.state = { pairings: [], loading: true };
    }

    public componentDidMount() {
        this.service.fetchCurrencyData(5)
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

    private readonly drawChart = () => {
        this.candleChart = new CandleChartDrawer(this.chartData, CandleChartPage.ChartElement);
        this.setState({ loading: false });
    }
}
