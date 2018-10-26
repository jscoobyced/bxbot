import { SelectOption } from '../Models';
import { CandleChartDataService } from './CandleChartDataService';
import { Pairing } from './Models';

export class CandleChartDataServiceMock extends CandleChartDataService {

    public fetchCurrencyData(currency: number): Promise<Pairing[]> {
        return this.fetchData<Pairing[]>('/data.json');
    }

    public fetchCurrencies(): Promise<SelectOption[]> {
        return this.fetchData<SelectOption[]>(`/currencies.json`);
    }
}
