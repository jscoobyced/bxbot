export class DateUtil {
    public static toHumanHours(date: Date): string {
        return `${this.toDigits(date.getHours(), 2)}:${this.toDigits(date.getMinutes(), 2)}`;
    }

    private static toDigits(value: number, length: number): string {
        let result: string = value.toString();
        while (result.length < length) {
            result = "0" + result;
        }

        return result;
    }
}
