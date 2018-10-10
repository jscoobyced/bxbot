import { ICandleChartDataService } from "./CandleChartDataService";

export interface Pairing {
    timestamp: number;
    low: number;
    high: number;
    close: number;
    open: number;
}

export interface CandleChartPageData {
    pairings: Pairing[];
    loading: boolean;
    currency: string;
}

export interface CandleChartPageProps {
    currencyId: number;
}

export interface CandleChartProps {
    currency: string;
    element: string;
}
