import { Decision, Pairing, Pattern } from "../Models";
import { AnalysisHelper } from "./AnalysisHelper";

const highPairing1: Pairing = {
    high: 1500,
    open: 1300,
    close: 1100,
    low: 150,
    timestamp: 123456789
};

const highPairing2: Pairing = {
    high: 1500,
    open: 1300,
    close: 1400,
    low: 150,
    timestamp: 123456789
};

const lowPairing1: Pairing = {
    high: 1400,
    open: 1200,
    close: 150,
    low: 100,
    timestamp: 123456789
};

const lowPairing2: Pairing = {
    high: 1400,
    open: 1200,
    close: 1300,
    low: 100,
    timestamp: 123456789
};

const largePairing: Pairing = {
    high: 2000,
    open: 50,
    close: 1350,
    low: 50,
    timestamp: 123456789
};

const positivePairing: Pairing = {
    high: 3000,
    open: 1350,
    close: 1550,
    low: 1250,
    timestamp: 123456789
};

const negativePairing: Pairing = {
    high: 1600,
    open: 1550,
    close: 1350,
    low: 1050,
    timestamp: 123456789
};

export class AnalyserHelperTestData {
    public readonly four: Pairing = {
        timestamp: 1535252400000,
        low: 217700.0,
        high: 218900.0,
        open: 217800.0,
        close: 218250.0
    };

    public readonly three: Pairing = {
        timestamp: 1535252700000,
        low: 218200.0,
        high: 219900.0,
        open: 218200.0,
        close: 218650.0
    };

    public readonly two: Pairing = {
        timestamp: 1535253000000,
        low: 218050.0,
        high: 219901,
        open: 219000.0,
        close: 218100.0
    };

    public readonly one = {
        timestamp: 1535253300000,
        low: 216400.0,
        high: 217650.99999,
        open: 217600.0,
        close: 216800.0
    };

    public readonly current: Pairing = {
        timestamp: 1535253600000,
        low: 215500.0,
        high: 216801,
        open: 216700.0,
        close: 216100.0
    };

    public readonly sellPattern: Pattern = {
        decision: Decision.Sell,
        confidence: 74,
        comment: "none"
    };

    public readonly buyPattern: Pattern = {
        decision: Decision.Buy,
        confidence: 84,
        comment: "none"
    };
}

test('AnalysisHelper check not IsDropping', () => {
    let isNotDropping = AnalysisHelper.IsDropping(highPairing1, lowPairing2);
    expect(isNotDropping).toBeFalsy();

    isNotDropping = AnalysisHelper.IsDropping(highPairing2, lowPairing1);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsDropping', () => {
    const isDropping = AnalysisHelper.IsDropping(highPairing1, lowPairing1);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsDropping(lowPairing1, highPairing1);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsRaising', () => {
    const isRaising = AnalysisHelper.IsRaising(lowPairing2, highPairing2);
    expect(isRaising).toBeTruthy();

    const isNotRaising = AnalysisHelper.IsRaising(highPairing2, lowPairing2);
    expect(isNotRaising).toBeFalsy();
});

test('AnalysisHelper check IsEngulfing', () => {
    const isDropping = AnalysisHelper.IsEngulfing(largePairing, highPairing1, lowPairing1);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsEngulfing(highPairing1, lowPairing1, largePairing);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsPositive', () => {
    const isPositive = AnalysisHelper.IsPositive(positivePairing);
    expect(isPositive).toBeTruthy();

    const isNotPositive = AnalysisHelper.IsPositive(negativePairing);
    expect(isNotPositive).toBeFalsy();
});

test('AnalysisHelper check IsNegative', () => {
    const IsNegative = AnalysisHelper.IsNegative(negativePairing);
    expect(IsNegative).toBeTruthy();

    const IsNotNegative = AnalysisHelper.IsNegative(positivePairing);
    expect(IsNotNegative).toBeFalsy();
});

test('AnalysisHelper check IsBigDrop', () => {
    const IsBigDrop = AnalysisHelper.IsBigDrop(100, 1);
    expect(IsBigDrop).toBeTruthy();

    const IsNotBigDrop = AnalysisHelper.IsBigDrop(1, 100);
    expect(IsNotBigDrop).toBeFalsy();
});

test('AnalysisHelper check IsReversingDown', () => {
    const IsReversingDown = AnalysisHelper.IsReversingDown(positivePairing, negativePairing);
    expect(IsReversingDown).toBeTruthy();

    const IsNotReversingDown = AnalysisHelper.IsReversingDown(negativePairing, positivePairing);
    expect(IsNotReversingDown).toBeFalsy();
});
