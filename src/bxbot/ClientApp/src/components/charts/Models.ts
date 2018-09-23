export interface Pairing {
    timestamp: number;
    low: number;
    high: number;
    close: number;
    open: number;
}

export interface CandleChartPageState {
    pairings: Pairing[];
    loading: boolean;
}

export interface CandleChartProps {
    currency: string;
    element: string;
}