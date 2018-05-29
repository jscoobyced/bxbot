import { } from 'jest';
import { DataFormatter } from '../../../components/charts/DataFormatter';
import { Pairing } from '../../../components/charts/Models';

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

    it('format empty array', () => {
        const result = dataFormatter.formatBollingerData([], 0);
        expect(result).toEqual([]);
    })

    it('format single value array', () => {
        let result = dataFormatter.formatBollingerData([zeroPairing], 0);
        expect(result).toEqual([["07:00", 0, 0, 0, 0, undefined, undefined, undefined]]);
        result = dataFormatter.formatBollingerData([positivePairing], 0);
        expect(result).toEqual([["07:00", 1, 1, 1, 1, undefined, undefined, undefined]]);
    })

    it('format negative array', () => {
        const result = dataFormatter.formatBollingerData([negativePairing], 0);
        expect(result).toEqual([["06:59", -1, -1, -1, -1, undefined, undefined, undefined]]);
    })

    it('format array', () => {
        const result = dataFormatter.formatBollingerData([negativePairing, zeroPairing, positivePairing], 0);
        expect(result).toEqual([["06:59", -1, -1, -1, -1, undefined, undefined, undefined], ["07:00", 0, 0, 0, 0, undefined, undefined, undefined], ["07:00", 1, 1, 1, 1, undefined, undefined, undefined]]);
    })
});
