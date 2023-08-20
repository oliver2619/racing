import { Car } from "./car";
import { Parcour } from "./parcour/parcour";
import { Weather } from "./weather";

export interface BenchmarkResult {
    readonly averageSpeed: number;
    readonly cruiseRange: number;
}

export class Benchmark {

    private constructor(private readonly parcour: Parcour, private readonly weather: Weather, private readonly car: Car) {}

    private simulate() {

    }

    static run(parcour: Parcour, weather: Weather, car: Car): BenchmarkResult {
        const ret: BenchmarkResult =  {
            averageSpeed: 3.24,
            cruiseRange: 1.4
        };
        return ret;
    }
}