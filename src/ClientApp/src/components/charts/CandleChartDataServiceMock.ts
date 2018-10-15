import { ICandleChartDataService } from './CandleChartDataService';
import { CandleChartDataServiceResponse } from './Models';

export class CandleChartDataServiceMock implements ICandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<CandleChartDataServiceResponse> {
        if (currency === undefined) {
            return Promise.resolve({
                pairings: [],
                currency: '',
                currencyOptions: []
            });
        }

        return this.fetchData('/data.json');
    }

    private fetchData(url: string): Promise<CandleChartDataServiceResponse> {

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<CandleChartDataServiceResponse>;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}
