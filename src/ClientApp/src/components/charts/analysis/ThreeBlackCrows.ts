import { Decision, Pairing, Pattern } from '../Models';
import { AnalysisHelper } from './AnalysisHelper';
import { DefaultPattern, IAnalyser } from './Models';

export class ThreeBlackCrows implements IAnalyser {
    public analyse(pairings: Pairing[], index: number, upper: boolean): Pattern {
        if (!pairings || pairings.length < index || index < 4 || upper) {
            return DefaultPattern;
        }

        const four = pairings[index - 4];
        const three = pairings[index - 3];
        const two = pairings[index - 2];
        const one = pairings[index - 1];
        const current = pairings[index];

        if (AnalysisHelper.IsRaising(four, three)
            && AnalysisHelper.IsReversingDown(three, two)
            && AnalysisHelper.IsDropping(two, one)
            && AnalysisHelper.IsDropping(one, current)
            && two.high > three.high) {
            return {
                decision: Decision.Sell,
                confidence: 78,
                comment: "Three Black Crows pattern recognized."
            };
        }

        return DefaultPattern;
    }
}
