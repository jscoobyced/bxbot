import { Decision, Pairing, Pattern } from '../Models';
import { AnalysisHelper } from './AnalysisHelper';
import { DefaultPattern, IAnalyser } from './Models';

export class ThreeLinesBuy implements IAnalyser {
    public analyse(pairings: Pairing[], index: number, upper: boolean): Pattern {
        if (!pairings || pairings.length < index || index < 3 || !upper) {
            return DefaultPattern;
        }

        const three = pairings[index - 3];
        const two = pairings[index - 2];
        const one = pairings[index - 1];
        const current = pairings[index];

        if (AnalysisHelper.IsDropping(three, two)
            && AnalysisHelper.IsDropping(two, one)
            && AnalysisHelper.IsEngulfing(current, three, one)) {
            return {
                decision: Decision.Buy,
                confidence: 84
            };
        }

        return DefaultPattern;
    }
}
