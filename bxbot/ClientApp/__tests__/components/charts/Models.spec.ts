import { } from 'jest';
import { Pairing, FetchDataState } from '../../../components/charts/Models';

describe('Charts models', () => {

    it('can create and modify a Pairing instance', () => {
        let pairing:Pairing = {
            timestamp: 0,
            close: 0,
            high: 0,
            open: 0,
            low: 0
        };
        pairing.low = 5;
        expect(pairing.low).toBe(5)
    })

    it('can create and modify a FetchDataState instance', () => {
        let fetchDataState:FetchDataState = {
            pairings: [],
            loading: true,
            url: ''
        };
        fetchDataState.loading = false;
        expect(fetchDataState.loading).toBe(false)
    })
});