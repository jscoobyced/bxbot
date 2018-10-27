import { Pairing, Pattern } from "../Models";

export interface IAnalyser {
    analyse(pairings: Pairing[], index: number): Pattern;
}