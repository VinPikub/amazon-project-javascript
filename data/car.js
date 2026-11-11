class Car{
    brand;
    model;

    constructor(brand, model)
    {
        this.brand = brand;
        this.model = model;
    }
}

const carOne = new Car('Toyota', 'Corolla');
const carTwo = new Car('Tesla', 'Model 3');

console.log(carOne);
console.log(carTwo);