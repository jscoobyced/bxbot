import * as React from 'react';
import { CandleChart } from './CandleChart';
import { CandleChartDrawer } from './CandleChartDrawer';
import { DataFormatter } from './DataFormatter';
import { GoogleChartInitializer } from './GoogleChartInitializer';
import { CandleChartPageData } from './Models';

export class CandleChartPage extends React.Component<CandleChartPageData> {
    private static readonly ChartElement = "candle_div";
    private candleChart: CandleChartDrawer = new CandleChartDrawer([], "");
    private readonly bollingerSize = 20;
    private readonly dataFormatter: DataFormatter = new DataFormatter();
    private chartData: any;

    constructor(props: CandleChartPageData) {
        super(props);
    }

    public componentDidUpdate() {
        const { pairings } = this.props;
        if (pairings !== []) {
            this.chartData = this.dataFormatter.formatBollingerData(pairings, this.bollingerSize);
            if (!GoogleChartInitializer.IsReady()) {
                new GoogleChartInitializer().Init(this.drawChart);
            } else {
                this.drawChart();
            }
        }
    }

    public render(): JSX.Element {
        return <CandleChart
            element={CandleChartPage.ChartElement}
            currency={this.props.currency}
        />;
    }

    private readonly drawChart = () => {
        this.candleChart = new CandleChartDrawer(this.chartData, CandleChartPage.ChartElement);
        this.candleChart.drawChart();
    }
}
