import { SelectOption } from '../Models';
import { Pairing } from './Models';

export class CandleChartDataService implements ICandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        if (currency === undefined) {
            return Promise.resolve([]);
        }

        return this.fetchData<Pairing[]>(`/api/Data/pairing/${currency}/5`);
    }

    public fetchCurrencies(): Promise<SelectOption[]> {
        return this.fetchData<SelectOption[]>(`/api/Data/currencies`);
    }

    private fetchData<T>(url: string): Promise<T> {

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<T>;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}

export interface ICandleChartDataService {
    fetchCurrencyData(currency: number): Promise<Pairing[]>;
    fetchCurrencies(): Promise<SelectOption[]>;
}
