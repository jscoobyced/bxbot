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
        return first.open < first.close
            && second.open < second.close
            && second.close > first.close
            && second.low > first.low
            && second.open > first.open
            && second.high > first.high;
    }

    public static IsEngulfing(current: Pairing, first: Pairing, previous: Pairing): boolean {
        return current.open < previous.close
            && current.low < previous.low
            && current.close > first.open
            && current.high > first.high;
    }

    public static IsPositive(pairing: Pairing): boolean {
        return pairing.close > pairing.open;
    }

    public static IsNegative(pairing: Pairing): boolean {
        return pairing.close < pairing.open;
    }

    public static IsBigDrop(one: number, two: number): boolean {
        return ((one - two) / one) > 0.002;
    }

    public static IsReversingDown(previous: Pairing, current: Pairing): boolean {
        return AnalysisHelper.IsPositive(previous)
            && AnalysisHelper.IsNegative(current);
    }
}
