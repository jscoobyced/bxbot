import { Decision, Pairing, Pattern } from '../Models';
import { IAnalyser } from './Models';

export class ThreeLines implements IAnalyser {
    public analyse(pairings: Pairing[], index: number): Pattern {
        const check = Math.floor(Math.random() * 100) + 1;
        const confidence = Math.floor(Math.random() * 100) + 1;
        if (check > 85) {
            return {
                confidence,
                decision: Decision.Buy
            };
        }
        if (check < 15) {
            return {
                confidence,
                decision: Decision.Sell
            };
        }
        return {
            confidence: 100,
            decision: Decision.Nothing
        };
    }

}