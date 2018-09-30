export class GoogleChartInitializer {

    public static IsReady(): boolean {
        (window as any).JSGoogleChart = (window as any).JSGoogleChart || false;
        return (window as any).JSGoogleChart as boolean;
    }

    public Init(render: () => void): boolean {
        (window as any).JSGoogleChart = false;
        (window as any).JSGoogleChartFunction = render;
        const body = document.getElementsByTagName('body')[0];
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
