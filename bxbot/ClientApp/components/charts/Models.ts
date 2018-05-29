export interface Pairing {
    timestamp: number;
    low: number;
    high: number;
    close: number;
    open: number;
}

export interface FetchDataState {
    pairings: Pairing[];
    loading: boolean;
    url: string;
}
