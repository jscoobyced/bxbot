export class TestUtils {

    public static mockFetch(data: any) {
        return jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => data
            })
        );
    }
}

export interface TestData {
    input: any;
    expected: any;
    executed: number[];
}
