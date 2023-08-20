export interface CarModel {

    readonly maxFuel: number;
}

class CarModelRenault implements CarModel {

    readonly maxFuel = 100;
}

class CarModelFerrari implements CarModel {

    readonly maxFuel = 100;
}

class CarModelLotus implements CarModel {

    readonly maxFuel = 100;
}

class CarModelBMW implements CarModel {

    readonly maxFuel = 100;
}

class CarModelHonda implements CarModel {

    readonly maxFuel = 100;
}

class CarModelMercedes implements CarModel {

    readonly maxFuel = 100;
}

export const CAR_MODELS: ReadonlyArray<CarModel> = Object.freeze([
    new CarModelRenault(),
    new CarModelFerrari(),
    new CarModelLotus(),
    new CarModelBMW(),
    new CarModelHonda(),
    new CarModelMercedes()
]);