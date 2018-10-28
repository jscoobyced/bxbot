import { Pairing } from "../Models";
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
    const isDropping = AnalysisHelper.IsRaising(lowPairing1, highPairing1);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsRaising(highPairing1, lowPairing1);
    expect(isNotDropping).toBeFalsy();
});

test('AnalysisHelper check IsEngulfing', () => {
    const isDropping = AnalysisHelper.IsEngulfing(largePairing, highPairing1, lowPairing1);
    expect(isDropping).toBeTruthy();

    const isNotDropping = AnalysisHelper.IsEngulfing(highPairing1, lowPairing1, largePairing);
    expect(isNotDropping).toBeFalsy();
});
