import { ChangeEvent } from "react";
import { SelectOption } from "../Models";

export interface Pairing {
    timestamp: number;
    low: number;
    high: number;
    close: number;
    open: number;
}

export interface CandleChartPageData {
    pairings: Pairing[];
    loadingCurrencyData: boolean;
    loadingCurrencies: boolean;
    currency: string;
    currencyOptions: SelectOption[];
}

export interface CandleChartComponentState {
    pairings: Pairing[];
    loading: boolean;
    currency: string;
}

export interface CandleChartPageProps {
    currencyId: number;
}

export interface CandleChartProps {
    element: string;
}

export interface CandleChartCurrencyProps {
    onChangeCurrency: (event: ChangeEvent<HTMLSelectElement>) => void;
    currencyOptions: SelectOption[];
}

export interface Pattern {
    confidence: number;
    decision: Decision;
    comment: string;
}

export enum Decision {
    Nothing = 0,
    Buy = 1,
    Sell = 2
}
