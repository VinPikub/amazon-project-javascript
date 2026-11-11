class Car{
    brand;
    model;
    speed = 0;
    constructor(brand, model)
    {
        this.brand = brand;
        this.model = model;
    }

    displayInfo()
    {
        console.log(`brand: ${this.brand} and model: ${this.model} and speed is ${this.speed}`);
    }

    go()
    {   /*
        this.speed += 5;
        this.speed = (this.speed < 200) ? this.speed - 5 : this.speed;
        */
        if((this.speed + 5) <= 200)
            this.speed += 5;
    }

    brake()
    {
        /*
        this.speed -= 5;
        this.speed = (this.speed > 200) ? this.speed + 5 : this.speed;
        */
        if((this.speed -5) >= 0)
            this.speed -= 5;
    }
}

const carToyota = new Car('Toyota', 'Corolla');
carToyota.displayInfo();
for(let value = 0; value <= 55; value++)
{
    carToyota.go();
}
carToyota.displayInfo();

const carCorolla = new Car('Tesla', 'Model 3');
carCorolla.displayInfo();

for(let value = 0; value <= 10; value++)
{
    carCorolla.go();
}

carCorolla.displayInfo();
for(let value = 0; value < 26; value++)
{
    carCorolla.brake();
}
carCorolla.displayInfo();