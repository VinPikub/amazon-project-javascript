class Car{
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

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
        if(this.isTrunkOpen === false)
        {
            if((this.speed + 5) <= 200)
                this.speed += 5;
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
        if((this.speed -5) >= 0)
            this.speed -= 5;
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

const carToyota = new Car('Toyota', 'Corolla');
carToyota.displayInfo();
carToyota.go();
carToyota.openTrunk();
carToyota.go();
carToyota.closeTrunk();
carToyota.go();

const carCorolla = new Car('Tesla', 'Model 3');
carCorolla.displayInfo();

