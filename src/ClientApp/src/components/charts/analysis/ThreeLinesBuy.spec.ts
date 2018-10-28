import { Decision, Pairing } from "../Models";
import { DefaultPattern } from "./Models";
import { ThreeLinesBuy } from "./ThreeLinesBuy";

const three: Pairing = {
    high: 1500,
    open: 1300,
    close: 1100,
    low: 150,
    timestamp: 123456789
};

const two: Pairing = {
    high: 1450,
    open: 1250,
    close: 900,
    low: 120,
    timestamp: 123456789
};

const one: Pairing = {
    high: 1400,
    open: 1200,
    close: 150,
    low: 100,
    timestamp: 123456789
};

const current: Pairing = {
    high: 2000,
    open: 50,
    close: 1350,
    low: 50,
    timestamp: 123456789
};

const buyPattern = {
    decision: Decision.Buy,
    confidence: 84
};

test('ThreeLinesBuy analysis is skipped because of parameters', () => {
    const threeLinesBuy = new ThreeLinesBuy();
    let result = threeLinesBuy.analyse(null as unknown as Pairing[], 2, false);
    expect(result).toEqual(DefaultPattern);

    result = threeLinesBuy.analyse([two, two], 4, false);
    expect(result).toEqual(DefaultPattern);

    result = threeLinesBuy.analyse([two, two, two, two], 3, false);
    expect(result).toEqual(DefaultPattern);

    result = threeLinesBuy.analyse([two, two, two, two, two], 4, false);
    expect(result).toEqual(DefaultPattern);
});

test('ThreeLinesBuy analysis is Buy', () => {
    const threeLinesBuy = new ThreeLinesBuy();
    const result = threeLinesBuy.analyse([three, two, one, current], 3, true);
    expect(result).toEqual(buyPattern);
});

test('ThreeLinesBuy analysis is Nothing', () => {
    const threeLinesBuy = new ThreeLinesBuy();
    const result = threeLinesBuy.analyse([three, two, current, one], 3, true);
    expect(result).toEqual(DefaultPattern);
});
