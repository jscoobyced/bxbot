export class TestUtils {

    public static mockFetch(data: any) {
        return jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => data
            })
        );
    }

    public static mockFetchNotOk(error: string) {
        return jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: false,
                statusText: error
            })
        );
    }

    public static mockErrorFetch(error: string) {
        return jest.fn().mockImplementation(() => {
            throw new Error(error);
        });
    }
}

export interface TestData {
    input: any;
    expected: any;
    executed: number[];
}
