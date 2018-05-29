import { BollingerBand, BollingerBandData } from '../../utils/Bollinger';
import { } from 'jest';

let bollingerBand = new BollingerBand();

describe('test Bollinger Band functions', () => {
  let testCases = [
    [[], undefined, undefined, { upper: [], mid: [], lower: [] }],
    [[], 0, 1, { upper: [], mid: [], lower: [] }],
    [[10, 10, 10], 0, 1, { upper: [NaN], mid: [10], lower: [NaN] }],
    [[10, 10, 10], 0, 0, { upper: [NaN], mid: [10], lower: [NaN] }],
    [[5, 10, 15], 1, 1, { upper: [5, 10, 15], mid: [5, 10, 15], lower: [5, 10, 15] }],
    [[10, 10, 10], 1, 1, { upper: [10, 10, 10], mid: [10, 10, 10], lower: [10, 10, 10] }],
    [[5, 10, 15], 1, 2, { upper: [5, 10, 15], mid: [5, 10, 15], lower: [5, 10, 15] }],
    [[5, 10, 15, 20, 15, 10, 5], 3, 2, {
      lower: [undefined, undefined, 1.8350341907227392, 6.835034190722739, 11.95262145875635, 6.835034190722739, 1.8350341907227392],
      mid: [undefined, undefined, 10, 15, 16.666666666666668, 15, 10],
      upper: [undefined, undefined, 18.164965809277263, 23.164965809277263, 21.380711874576985, 23.164965809277263, 18.164965809277263]
    }]
  ];

  for (let testCase of testCases) {
    runTest(testCase[0], testCase[1], testCase[2], testCase[3]);
  }
});

function runTest(data, size, times, result) {
  describe(`create boolinger band with ${data} with ${size} size and ${times} standard deviation(s).`, () => {
    test(`${result}`, () => {
      expect(bollingerBand.bb(data, size, times)).toEqual(result);
    });
  })

}