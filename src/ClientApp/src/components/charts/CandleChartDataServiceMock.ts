import { ICandleChartDataService } from './CandleChartDataService';
import { Pairing } from './Models';

export class CandleChartDataServiceMock implements ICandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        if (currency === undefined) {
            return Promise.resolve([]);
        }

        return this.fetchData('/data.json');
    }

    private fetchData(url: string): Promise<Pairing[]> {

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<Pairing[]>;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}
