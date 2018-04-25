import { StandardDeviation } from './StandardDeviation';
import { MovingAverage } from './MovingAverage';

export interface BollingerBandData {
  upper: Array<number>,
  mid: Array<number>,
  lower: Array<number>
}

export class BollingerBand {

/**
 * Calculate the Bollinger Bands (upper, moving average and lower)
 * @param data The closing prices array
 * @param size The number of days to use for the computation
 * @param times The number of standard deviations to take from the moving average
 * @param movingAverage A pre-calculated moving average array
 * @param standardDeviation A pre-calculated standard deviation array
 */
  public bb(data: Array<number>, size: number = 20, times: number = 2, movingAverage: Array<number> = [], standardDeviation: Array<number> = []): BollingerBandData {

    movingAverage = movingAverage || new MovingAverage().ma(data, size);
    standardDeviation = standardDeviation || new StandardDeviation().sd(data, size);

    const timesSd: Array<number> = this.multiply(standardDeviation, times)

    return {
      upper: this.add(movingAverage, timesSd),
      mid: movingAverage,
      lower: this.substract(movingAverage, timesSd)
    }
  }

  private multiply(data: Array<number>, times: number): Array<number> {
    return data.map(x => x * times);
  }

  private add(data1: Array<number>, data2: Array<number>): Array<number> {
    return data1.map((x, i) => x + data2[i]);
  }

  private substract(data1: Array<number>, data2: Array<number>): Array<number> {
    return data1.map((x, i) => x - data2[i]);
  }
}