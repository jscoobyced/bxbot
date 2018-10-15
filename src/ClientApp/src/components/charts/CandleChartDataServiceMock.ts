import { SelectOption } from '../Models';
import { ICandleChartDataService } from './CandleChartDataService';
import { Pairing } from './Models';

export class CandleChartDataServiceMock implements ICandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        return this.fetchData<Pairing[]>('/data.json');
    }

    public fetchCurrencies(): Promise<SelectOption[]> {
        return this.fetchData<SelectOption[]>(`/currencies.json`);
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
