import { CarJson } from "./car-json";
import { CarModel, CAR_MODELS } from "./car-model";
import { Tires } from "./tires";
import { Weather } from "./weather";

export class Car {

    get challengeSuccessTimes(): number {
        return 25;
    }

    get maxFuel(): number {
        return this.carModel.maxFuel;
    }

    private constructor(private readonly carModel: CarModel, public tires: Tires, public flaps: number, public gear: number, public durability: number, public fuel: number) { }

    static load(index: number, json: CarJson): Car {
        return new Car(CAR_MODELS[index], (Tires as any)[json.tires] as Tires, json.flaps, json.gear, json.durability, json.fuel);
    }

    static newInstance(index: number): Car {
        return new Car(CAR_MODELS[index], Tires.DRY, 2, 2, 1, 10);
    }

    clone(): Car {
        return new Car(this.carModel, this.tires, this.flaps, this.gear, this.durability, this.fuel);
    }

    getMaxAcceleration(weather: Weather, random: number): number {
        return 1.2;
    }

    getMaxSpeed(curve: number | undefined, weather: Weather, random: number): number {
        if (curve !== undefined) {
            return 3.23;
        } else {
            return 5;
        }
    }

    save(): CarJson {
        const ret: CarJson = {
            durability: this.durability,
            flaps: this.flaps,
            fuel: this.fuel,
            gear: this.gear,
            tires: Tires[this.tires]
        };
        return ret;
    }
}