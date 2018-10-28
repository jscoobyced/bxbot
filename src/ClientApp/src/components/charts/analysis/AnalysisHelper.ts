import { Pairing } from "../Models";

export class AnalysisHelper {
    public static IsDropping(first: Pairing, second: Pairing): boolean {
        return first.open > first.close
            && second.open > second.close
            && second.close < first.close
            && second.low < first.low
            && second.open < first.open
            && second.high < first.high;
    }

    public static IsRaising(first: Pairing, second: Pairing): boolean {
        return AnalysisHelper.IsDropping(second, first);
    }

    public static IsEngulfing(current: Pairing, first: Pairing, previous: Pairing): boolean {
        return current.open < previous.close
            && current.low < previous.low
            && current.close > first.open
            && current.high > first.high;
    }
}
