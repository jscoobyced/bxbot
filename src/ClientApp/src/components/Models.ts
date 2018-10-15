export class Constants {
    public static readonly StaticContent = (process.env.mode === 'development') ? '' : '/dist';

    public static readonly ImagePath = `${Constants.StaticContent}/images/`;
}

export interface SelectOption {
    value: number;
    text: string;
}
