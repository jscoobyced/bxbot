import { MovingAverage } from '../../utils/MovingAverage';
import { } from 'jest';

let movingAverage = new MovingAverage();

describe('test Moving Average functions', () => {
  let testCases = [
    [[], undefined, []],
    [[], 0, []],
    [[1, undefined, undefined, undefined], 2, [undefined, 0.5, 0, 0]],
    [[10, 10, 10], 0, [10]],
    [[10, 10, 10], 4, [undefined, undefined, undefined]],
    [[10, 10, 10], 1, [10, 10, 10]],
    [[10, 10, 10], 2, [undefined, 10, 10]],
    [[5, 10, 15], 2, [undefined, 7.5, 12.5]],
    [[undefined, 10, 10, 10, undefined, 10], 3, [undefined, undefined, undefined, 10, 6.666666666666667, 6.666666666666667]],
    [[5, 10, 15, 20, 25, 20, 15, 10, 5], 3, [undefined, undefined, 10, 15, 20, 21.666666666666668, 20, 15, 10]]
  ];

  for (let testCase of testCases) {
    runTest(testCase[0], testCase[1], testCase[2]);
  }
});

function runTest(data, size, result) {
  describe(`create moving average with ${data} with ${size} size.`, () => {
    test(`${result}`, () => {
      expect(movingAverage.ma(data, size)).toEqual(result);
    });
  })

}