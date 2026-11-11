class Car{
    #brand; //private property
    #model; //private property
    #speed = 0;
    isTrunkOpen = false;

    constructor(brand, model)
    {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo()
    {
        console.log(`brand: ${this.#brand} and model: ${this.#model} and speed is ${this.#speed}`);
    }

    go()
    {   /*
        this.speed += 5;
        this.speed = (this.speed < 200) ? this.speed - 5 : this.speed;
        */
        if(this.isTrunkOpen === false)
        {
            if((this.#speed + 5) <= 200)
                this.#speed += 5;
        }
        else
        {
            console.log('error! Trunk is open');
        }
    }

    brake()
    {
        /*
        this.speed -= 5;
        this.speed = (this.speed > 200) ? this.speed + 5 : this.speed;
        */
        if((this.#speed -5) >= 0)
            this.#speed -= 5;
    }

    openTrunk()
    {
        if(!this.isTrunkOpen)
        {
            console.log('Trunk will be opened');
            this.isTrunkOpen = true;
        }
        else
            console.log('error! car is moving, trunk can not be opened');
    }

    closeTrunk()
    {
        console.log('Trunk will be closed');
        this.isTrunkOpen = false;
    }
}
const carToyota = new Car('Toyota', 'prius');
carToyota.go();
carToyota.displayInfo();

class RaceCar extends Car{
    acceleration;
    constructor(brand, model, acceleration)
    {
        super(brand, model);
        this.acceleration = acceleration;
    }
    go()
    {
        if((this.speed + this.acceleration) <= 300)
            this.speed += this.acceleration;
    }
}

const carMclaren = new RaceCar('McLaren', 'F1', 20);
carMclaren.go();
carMclaren.displayInfo();