import { Decision, Pairing, Pattern } from '../Models';
import { IAnalyser } from './Models';

export class DecisionMaker {

    private readonly analysers: IAnalyser[];

    public constructor(analysers: IAnalyser[]) {
        this.analysers = analysers;
    }

    public checkData(pairings: Pairing[], index: number, upper: boolean): string[] | null[] {
        const patterns: Pattern[] = [];
        if (pairings && pairings.length > 0) {
            this.analysers.forEach(analyser => {
                if (analyser) {
                    patterns.push(analyser.analyse(pairings, index, upper));
                }
            });

            if (patterns.length > 0) {
                patterns.sort(this.highestConfidence);
                return this.formatAnnotation(patterns[0]);
            }
        }
        return [null, null];
    }

    private highestConfidence(pattern1: Pattern, pattern2: Pattern): number {
        if (pattern1.confidence < pattern2.confidence) {
            return 1;
        }
        if (pattern1.confidence > pattern2.confidence) {
            return -1;
        }
        return 0;
    }

    private formatAnnotation(pattern: Pattern): string[] | null[] {
        let response: string[] | null[];
        switch (pattern.decision) {
            case Decision.Buy:
                response = ['Buy', `Confidence to buy ${pattern.confidence} %`];
                break;
            case Decision.Sell:
                response = ['Sell', `Confidence to sell ${pattern.confidence} %`];
                break;
            default:
                response = [null, null];
        }
        return response;
    }
}
