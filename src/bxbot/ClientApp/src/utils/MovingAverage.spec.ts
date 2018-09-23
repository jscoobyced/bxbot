import { MovingAverage } from './MovingAverage';

const movingAverage = new MovingAverage();

interface TestCase {
  data: number[];
  size: number | undefined;
  result: Array<number | undefined>;
}

describe('test Moving Average functions', () => {
  const testCases: TestCase[] = [
    { data: [], size: undefined, result: [] },
    { data: [], size: 0, result: [] },
    { data: [10, 10, 10], size: 0, result: [10] },
    { data: [10, 10, 10], size: 4, result: [undefined, undefined, undefined] },
    { data: [10, 10, 10], size: 1, result: [10, 10, 10] },
    { data: [10, 10, 10], size: 2, result: [undefined, 10, 10] },
    { data: [5, 10, 15], size: 2, result: [undefined, 7.5, 12.5] },
    { data: [5, 10, 15, 20, 25, 20, 15, 10, 5], size: 3,
      result: [undefined, undefined, 10, 15, 20, 21.666666666666668, 20, 15, 10] }
  ];

  for (const testCase of testCases) {
    runTest(testCase.data, testCase.size, testCase.result);
  }
});

function runTest(data: number[], size: number | undefined, result: Array<number | undefined>) {
  describe(`create moving average with ${data} with ${size} size.`, () => {
    test(`${result}`, () => {
      expect(movingAverage.ma(data, size)).toEqual(result);
    });
  });

}