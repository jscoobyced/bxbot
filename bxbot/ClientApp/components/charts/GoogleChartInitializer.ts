import { } from 'google.visualization';

export class GoogleChartInitializer {

    public Init(render: Function) {
        (<any>window).JSGoogleChart = false;
        (<any>window).JSGoogleChartFunction = render;
        const body = document.getElementsByTagName('body')[0]
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.gstatic.com/charts/loader.js'
        script.onload = this.Load;
        body.appendChild(script)
    }

    private Load() {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            (<any>window).JSGoogleChart = true;
            (<any>window).JSGoogleChartFunction();
        });
    }

    public static IsReady(): boolean {
        (<any>window).JSGoogleChart = (<any>window).JSGoogleChart || false;
        return (<any>window).JSGoogleChart as boolean;
    }
}