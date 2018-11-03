import { BollingerBand, BollingerBandData } from '../../utils/Bollinger';
import { DateUtil } from '../../utils/DateUtils';
import { DecisionMaker } from './analysis/DecisionMaker';
import { Pairing } from './Models';

export class DataFormatter {

    public formatData(
        chartData: Pairing[],
        bollingerSize: number,
        decisionMaker?: DecisionMaker,
        hours = 12): any[] {
        const lengthToShow = hours * 12;
        const startIndex = Math.max(0, chartData.length - lengthToShow);
        const bollingerBand = this.createBollingerBand(chartData, bollingerSize, lengthToShow);
        let bollingerBandIndex = bollingerSize - 1;
        const formatedData = new Array<any>();

        for (let i = startIndex; i < chartData.length; i++) {
            const upperAnnotation = decisionMaker ? decisionMaker.checkData(chartData, i, true) : [null, null];
            const lowerAnnotation = decisionMaker ? decisionMaker.checkData(chartData, i, false) : [null, null];
            formatedData.push([
                DateUtil.toHumanHours(new Date(chartData[i].timestamp)),
                chartData[i].low,
                chartData[i].open,
                chartData[i].close,
                chartData[i].high,
                bollingerBand.lower[bollingerBandIndex],
                lowerAnnotation[0],
                lowerAnnotation[1],
                bollingerBand.upper[bollingerBandIndex],
                upperAnnotation[0],
                upperAnnotation[1],
                bollingerBand.mid[bollingerBandIndex]
            ]);
            bollingerBandIndex++;
        }

        return formatedData;
    }

    private createBollingerBand(chartData: Pairing[], bollingerSize: number, lengthToShow: number): BollingerBandData {
        const closePrice = new Array<any>();
        const bollingerStartIndex = Math.max(0, chartData.length - (bollingerSize + lengthToShow));
        for (let i = bollingerStartIndex; i < chartData.length; i++) {
            closePrice.push(chartData[i].close);
        }

        return new BollingerBand().bb(closePrice);
    }
}
