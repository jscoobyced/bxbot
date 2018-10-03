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
}

export interface CandleChartProps {
    currency: string;
    element: string;
}
