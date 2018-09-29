import { Pairing } from './Models';

export class CandleChartDataService {
    private defaultUrl: string = '/data.json';

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        if (currency === undefined) {
            return Promise.resolve([]);
        }

        if(true) {
            return this.fetchData('/api/Data/pairing/1/' + currency);
        }

        return this.fetchData('/api/Data/pairing/1/' + currency);
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