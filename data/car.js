class Car{
    brand;
    model;

    constructor(brand, model)
    {
        this.brand = brand;
        this.model = model;
    }

    displayInfo()
    {
        console.log(`brand: ${this.brand} and model: ${this.model}`);
    }
}

const carOne = new Car('Toyota', 'Corolla');
carOne.displayInfo();

const carTwo = new Car('Tesla', 'Model 3');
carTwo.displayInfo();