import { TestUtils } from '../../../../tests/TestUtils';
import { Decision } from '../Models';
import { DecisionMaker } from './DecisionMaker';
import { IAnalyser } from './Models';

const pairings = [
    {
        timestamp: 1234567890,
        low: 10,
        high: 11,
        open: 10,
        close: 10
    }
];

const sellAnalyser = TestUtils.mockAnalyser(Decision.Sell, 99);
const buyAnalyser = TestUtils.mockAnalyser(Decision.Buy, 99);
const response = [["Sell", "Confidence to sell 99 %"], ["Buy", "Confidence to buy 99 %"]];
const testCases = [
    { analyser: sellAnalyser, response: response[0] }
    , { analyser: buyAnalyser, response: response[1] }];

test('DecisionMaker checkData with no Pairing', () => {
    const decisionMaker = new DecisionMaker([TestUtils.mockAnalyser(Decision.Nothing, 0)]);
    const result = decisionMaker.checkData([], 1, true);
    expect(result).toEqual([null, null]);
});

test('DecisionMaker checkData with null analyser', () => {
    const decisionMaker = new DecisionMaker([null as unknown as IAnalyser]);
    const result = decisionMaker.checkData(pairings, 1, true);
    expect(result).toEqual([null, null]);
});

test('DecisionMaker checkData with Pairing but no decision', () => {
    const decisionMaker = new DecisionMaker([TestUtils.mockAnalyser(Decision.Nothing, 0)]);
    const result = decisionMaker.checkData(pairings, 1, true);
    expect(result).toEqual([null, null]);
});

test('DecisionMaker checkData with Pairing and decision to sell', () => {
    testCases.forEach(testCase => {
        const decisionMaker = new DecisionMaker([testCase.analyser]);
        const result = decisionMaker.checkData(pairings, 1, true);
        expect(result).toEqual(testCase.response);
    });
});

test('DecisionMaker checkData with Pairing and many decisions, choose to sell', () => {
    const lowDecision = TestUtils.mockAnalyser(Decision.Nothing, 0);
    const midDecision1 = TestUtils.mockAnalyser(Decision.Buy, 50);
    const midDecision2 = TestUtils.mockAnalyser(Decision.Buy, 50);
    const highDecision = TestUtils.mockAnalyser(Decision.Sell, 99);
    const decisionMaker = new DecisionMaker([midDecision1, lowDecision, highDecision, midDecision2]);
    const result = decisionMaker.checkData(pairings, 1, true);
    expect(result).toEqual(["Sell", "Confidence to sell 99 %"]);
});