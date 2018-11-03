import { Decision, Pairing, Pattern } from "../Models";

export interface IAnalyser {
    analyse(pairings: Pairing[], index: number, upper: boolean): Pattern;
}

export const DefaultPattern: Pattern = {
    confidence: 0,
    decision: Decision.Nothing,
    comment: ""
};
