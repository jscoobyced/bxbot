import { MovingAverage } from './MovingAverage';

export class StandardDeviation {

    public sd(data: Array<number>, size: number): Array<number> {
        const length = data.length;
        const avg = new MovingAverage().ma(data, size);
        const ret: Array<number> = [];

        let i = size - 1;
        let j;
        let sum;

        for (; i < length; i++) {
            sum = 0;
            j = i - size + 1;

            for (; j <= i; j++) {
                sum += Math.pow(data[j] - avg[i], 2);
            }

            ret[i] = Math.sqrt(sum / size);
        }

        return ret;
    }
}