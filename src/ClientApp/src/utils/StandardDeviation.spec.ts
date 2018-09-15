import { StandardDeviation } from './StandardDeviation';

const standardDeviation = new StandardDeviation();

interface TestCase {
  data: number[];
  result: Array<number | undefined>;
  size: number | undefined;
}

describe('test Standard Deviation functions', () => {
  const testCases: TestCase[] = [
    { data: [], size: undefined, result: [] },
    { data: [10, 10, 10], size: 0, result: [NaN, NaN, NaN] },
    { data: [10, 10, 10], size: 1, result: [0, 0, 0] },
    { data: [10, 10, 10], size: 2, result: [undefined, 0, 0] },
    { data: [5, 10, 15], size: 2, result: [undefined, 2.5, 2.5] }
  ];

  for (const testCase of testCases) {
    runTest(testCase.data, testCase.size, testCase.result);
  }
});

function runTest(data: number[], size: number | undefined, result: Array<number | undefined>) {
  describe(`create standard deviation with ${data} with ${size} size.`, () => {
    test(`${result}`, () => {
      expect(JSON.stringify(standardDeviation.sd(data, size))).toEqual(JSON.stringify(result));
    });
  });

}