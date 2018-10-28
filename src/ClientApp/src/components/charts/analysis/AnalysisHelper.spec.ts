import { Pairing } from "../Models";
import { AnalysisHelper } from "./AnalysisHelper";

const highPairing: Pairing = {
    high: 1500,
    open: 1300,
    close: 1100,
    low: 150,
    timestamp: 123456789
};

const lowPairing: Pairing = {
    high: 1400,
    open: 1200,
    close: 150,
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

test('AnalysisHelper check IsDropping', () => {
    const isDropping = AnalysisHelper.IsDropping(highPairing, lowPairing);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsDropping(lowPairing, highPairing);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsRaising', () => {
    const isDropping = AnalysisHelper.IsRaising(lowPairing, highPairing);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsRaising(highPairing, lowPairing);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsEngulfing', () => {
    const isDropping = AnalysisHelper.IsEngulfing(largePairing, highPairing, lowPairing);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsEngulfing(highPairing, lowPairing, largePairing);
    expect(isNotDropping).toBeFalsy();
});
