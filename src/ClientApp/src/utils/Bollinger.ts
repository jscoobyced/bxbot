import { MovingAverage } from './MovingAverage';
import { StandardDeviation } from './StandardDeviation';

export interface BollingerBandData {
  upper: Array<number | undefined>;
  mid: Array<number | undefined>;
  lower: Array<number | undefined>;
}

export class BollingerBand {

  /**
   * Calculate the Bollinger Bands (upper, moving average and lower)
   * @param data The closing prices array
   * @param size The number of days to use for the computation
   * @param times The number of standard deviations to take from the moving average
   */
  public bb(data: number[], size = 20, times = 2): BollingerBandData {

    const movingAverage = new MovingAverage().ma(data, size);
    const standardDeviation = new StandardDeviation().sd(data, size);

    const timesSd: number[] = this.multiply(standardDeviation, times);

    return {
      upper: this.add(movingAverage, timesSd),
      mid: movingAverage,
      lower: this.substract(movingAverage, timesSd)
    };
  }

  private multiply(data: number[], times: number): number[] {
    return data.map(x => x * times);
  }

  private add(data1: number[], data2: number[]): number[] {
    return data1.map((x, i) => x + data2[i]);
  }

  private substract(data1: number[], data2: number[]): number[] {
    return data1.map((x, i) => x - data2[i]);
  }
}
