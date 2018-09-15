import { BollingerBand, BollingerBandData } from './Bollinger';

const bollingerBand = new BollingerBand();

interface TestCase {
  data: number[];
  result: BollingerBandData;
  size: number | undefined;
  times: number | undefined;
}

describe('test Bollinger Band functions', () => {
  const testCases: TestCase[] = [
    { data: [], size: undefined, times: undefined, result: { upper: [], mid: [], lower: [] } },
    { data: [], size: 0, times: 1, result: { upper: [], mid: [], lower: [] } },
    { data: [10, 10, 10], size: 0, times: 1, result: { upper: [NaN], mid: [10], lower: [NaN] } },
    { data: [10, 10, 10], size: 0, times: 0, result: { upper: [NaN], mid: [10], lower: [NaN] } },
    { data: [5, 10, 15], size: 1, times: 1, result: { upper: [5, 10, 15], mid: [5, 10, 15], lower: [5, 10, 15] } },
    { data: [10, 10, 10], size: 1, times: 1, result: { upper: [10, 10, 10], mid: [10, 10, 10], lower: [10, 10, 10] } },
    { data: [5, 10, 15], size: 1, times: 2, result: { upper: [5, 10, 15], mid: [5, 10, 15], lower: [5, 10, 15] } },
    {
      data: [5, 10, 15, 20, 15, 10, 5], size: 3, times: 2, result: {
        lower: [undefined, undefined, 1.8350341907227392, 6.835034190722739,
          11.95262145875635, 6.835034190722739, 1.8350341907227392],
        mid: [undefined, undefined, 10, 15, 16.666666666666668, 15, 10],
        upper: [undefined, undefined, 18.164965809277263, 23.164965809277263,
          21.380711874576985, 23.164965809277263, 18.164965809277263]
      }
    }
  ];

  for (const testCase of testCases) {
    runTest(testCase.data, testCase.size, testCase.times, testCase.result);
  }
});

function runTest(data: number[], size: number | undefined, times: number | undefined, result: BollingerBandData) {
  describe(`create boolinger band with ${data} with ${size} size and ${times} standard deviation(s).`, () => {
    test(`${result}`, () => {
      expect(bollingerBand.bb(data, size, times)).toEqual(result);
    });
  });

}