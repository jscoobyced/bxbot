import { GoogleCharts } from 'google-charts';

export class GoogleChartInitializer {
    private static Ready: boolean = false;

    public constructor() {
        GoogleCharts.load(this.drawChart);
    }

    public static IsReady(): boolean {
        return GoogleChartInitializer.Ready;
    }

    private drawChart() {
        GoogleChartInitializer.Ready = true;
    }
}