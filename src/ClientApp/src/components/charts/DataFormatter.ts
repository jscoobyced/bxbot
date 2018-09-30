import { BollingerBand } from '../../utils/Bollinger';
import { DateUtil } from '../../utils/DateUtils';
import { Pairing } from './Models';

export class DataFormatter {
    public formatBollingerData(chartData: Pairing[], bollingerSize: number): any[] {
        const lengthToShow = 100;
        const startIndex = Math.max(0, chartData.length - lengthToShow);
        const bollingerStartIndex = Math.max(0, chartData.length - (bollingerSize + lengthToShow));
        const formatedData = new Array<any>();
        const closePrice = new Array<any>();
        for (let i = bollingerStartIndex; i < chartData.length; i++) {
            closePrice.push(chartData[i].close);
        }

        const bollingerBand = new BollingerBand().bb(closePrice);
        let bollingerBandIndex = bollingerSize - 1;
        for (let i = startIndex; i < chartData.length; i++) {
            formatedData.push([
                DateUtil.toHumanHours(new Date(chartData[i].timestamp)),
                chartData[i].low,
                chartData[i].open,
                chartData[i].close,
                chartData[i].high,
                bollingerBand.lower[bollingerBandIndex],
                bollingerBand.upper[bollingerBandIndex],
                bollingerBand.mid[bollingerBandIndex]
            ]);
            bollingerBandIndex++;
        }

        return formatedData;
    }
}
