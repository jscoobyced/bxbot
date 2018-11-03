import { Pairing } from "../Models";
import { AnalyserHelperTestData } from "./AnalysisHelper.spec";
import { DefaultPattern } from "./Models";
import { TwoBlackGapping } from "./TwoBlackGapping";

const data = new AnalyserHelperTestData();

test('TwoBlackGapping analysis is skipped because of parameters', () => {
    const twoBlackGapping = new TwoBlackGapping();
    let result = twoBlackGapping.analyse(null as unknown as Pairing[], 2, true);
    expect(result).toEqual(DefaultPattern);

    result = twoBlackGapping.analyse([data.two, data.two], 4, true);
    expect(result).toEqual(DefaultPattern);

    result = twoBlackGapping.analyse([data.two, data.two, data.two, data.two], 3, true);
    expect(result).toEqual(DefaultPattern);

    result = twoBlackGapping.analyse([data.two, data.two, data.two, data.two, data.two], 4, true);
    expect(result).toEqual(DefaultPattern);
});

test('TwoBlackGapping analysis is Sell', () => {
    const twoBlackGapping = new TwoBlackGapping();
    const result = twoBlackGapping.analyse([data.four, data.three, data.two, data.one, data.current], 4, false);
    const expected = data.sellPattern;
    expected.confidence = 68;
    expected.comment = "Two Black Gapping pattern recognized.";
    expect(result).toEqual(expected);
});

test('TwoBlackGapping analysis is Nothing', () => {
    const twoBlackGapping = new TwoBlackGapping();
    const result = twoBlackGapping.analyse([data.one, data.three, data.two, data.current, data.one], 4, false);
    expect(result).toEqual(DefaultPattern);
});
