import { StandardDeviation } from '../../utils/StandardDeviation';
import { } from 'jest';

let standardDeviation = new StandardDeviation();

describe('test Standard Deviation functions', () => {
  let testCases = [
    [[], 0, []],
    [[10, 10, 10], 0, [NaN, NaN, NaN]],
    [[10, 10, 10], 1, [0, 0, 0]],
    [[10, 10, 10], 2, [undefined, 0, 0]],
    [[5, 10, 15], 2, [undefined, 2.5, 2.5]],
  ];

  for (let testCase of testCases) {
    runTest(testCase[0], testCase[1], testCase[2]);
  }
});

function runTest(data, size, result) {
  describe(`create standard deviation with ${data} with ${size} size.`, () => {
    test(`${result}`, () => {
      expect(JSON.stringify(standardDeviation.sd(data, size))).toEqual(JSON.stringify(result));
    });
  })

}