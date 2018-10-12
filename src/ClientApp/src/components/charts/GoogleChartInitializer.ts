import { HtmlUtils } from "../../utils/HtmlUtils";

export class GoogleChartInitializer {

    public static IsReady(): boolean {
        (window as any).JSGoogleChart = (window as any).JSGoogleChart || false;
        return (window as any).JSGoogleChart as boolean;
    }

    private static loaded = false;

    public Init(render: () => void): boolean {
        if (GoogleChartInitializer.loaded) {
            return false;
        }

        GoogleChartInitializer.loaded = true;
        (window as any).JSGoogleChart = false;
        (window as any).JSGoogleChartFunction = render;
        const body = HtmlUtils.getFirstElementsByTagName('body');
        if (!body) {
            return false;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = this.Load;
        body.appendChild(script);
        return true;
    }

    private Load() {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            (window as any).JSGoogleChart = true;
            (window as any).JSGoogleChartFunction();
        });
    }
}
