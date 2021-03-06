export class MovingAverage {

    public ma(data: number[], size?: number): number[] {
        if (data === undefined || data.length === 0) {
            return [];
        }

        const isNumber = (subject: any) => typeof subject === 'number';
        const length = data.length;
        const ret: number[] = [];

        if (!size) {
            ret[0] = data.reduce((a, b) => a + b) / length;
            return ret;
        }

        if (size <= 1) {
            return data.slice();
        }

        if (size > length) {
            return Array(length);
        }

        const prepare = size - 1;
        let sum = 0;
        let i = 0;
        let counter = 0;
        let datum;

        for (; i < length && counter < prepare; i++) {
            datum = data[i];

            if (isNumber(datum)) {
                sum += datum;
                counter++;
            }
        }

        for (; i < length; i++) {
            datum = data[i];

            if (isNumber(datum)) {
                sum += datum;
            }

            if (isNumber(data[i - size])) {
                sum -= data[i - size];
            }

            ret[i] = sum / size;
        }

        return ret;
    }
}
