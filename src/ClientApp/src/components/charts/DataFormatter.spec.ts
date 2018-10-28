import { TestUtils } from '../../../tests/TestUtils';
import { DateUtil } from './../../utils/DateUtils';
import { DecisionMaker } from './analysis/DecisionMaker';
import { DataFormatter } from './DataFormatter';
import { Decision, Pairing } from './Models';

describe('DataFormatter', () => {

    const dataFormatter: DataFormatter = new DataFormatter();
    const zeroPairing: Pairing = {
        close: 0,
        open: 0,
        high: 0,
        low: 0,
        timestamp: 0
    };

    const positivePairing: Pairing = {
        close: 1,
        open: 1,
        high: 1,
        low: 1,
        timestamp: 1
    };

    const negativePairing: Pairing = {
        close: -1,
        open: -1,
        high: -1,
        low: -1,
        timestamp: -1
    };

    const negativeHour = DateUtil.toHumanHours(new Date(-1));
    const positiveHour = DateUtil.toHumanHours(new Date(0));
    const decisionMaker = new DecisionMaker([TestUtils.mockAnalyser(Decision.Sell, 99)]);

    it('format empty array', () => {
        const result = dataFormatter.formatData([], 0);
        expect(result).toEqual([]);
    });

    it('format single value array', () => {
        let result = dataFormatter.formatData([zeroPairing], 0);
        expect(result).toEqual([[positiveHour, 0, 0, 0, 0, undefined, null, null, undefined, null, null, undefined]]);
        result = dataFormatter.formatData([positivePairing], 0);
        expect(result).toEqual([[positiveHour, 1, 1, 1, 1, undefined, null, null, undefined, null, null, undefined]]);
    });

    it('format negative array', () => {
        const result = dataFormatter.formatData([negativePairing], 0);
        expect(result).toEqual(
            [[negativeHour, -1, -1, -1, -1, undefined, null, null, undefined, null, null, undefined]]);
    });

    it('format array', () => {
        const result = dataFormatter.formatData([negativePairing, zeroPairing, positivePairing], 0);
        expect(result).toEqual([
            [negativeHour, -1, -1, -1, -1, undefined, null, null, undefined, null, null, undefined],
            [positiveHour, 0, 0, 0, 0, undefined, null, null, undefined, null, null, undefined],
            [positiveHour, 1, 1, 1, 1, undefined, null, null, undefined, null, null, undefined]]);
    });

    it('format with decisionMaker', () => {
        const result = dataFormatter.formatData([negativePairing], 0, decisionMaker);
        expect(result).toEqual([
            [
                negativeHour,
                -1,
                -1,
                -1,
                -1,
                undefined,
                "Sell",
                "Confidence to sell 99 %",
                undefined,
                "Sell",
                "Confidence to sell 99 %",
                undefined]]);
    });
});