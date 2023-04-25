const Car = function(brand, model, maxTank) {
  this.brand = brand;
  this.model = model;
  this.maxTank = maxTank;
  this.nowTank = Math.floor(Math.random() * maxTank);
}

Car.from = function({brand, model, maxTank}) {
  return new Car(brand, model, maxTank)
}

Car.prototype.needPetrol = function() {
  return this.maxTank - this.nowTank;
}

Car.prototype.fillUp = function() {
  return this.nowTank = this.maxTank;
}

const bmw = Car.from({
  brand: 'BMW',
  model: 'X7',
  maxTank: 80
})

const mazda = new Car('Mazda', 'cx-5', 55);
console.log('mazda: ', mazda);
console.log('mazda: ', mazda.needPetrol());
console.log('mazda: ', mazda.fillUp());
console.log('mazda: ', mazda.needPetrol());

// console.log(bmw);

//  Создание наследования

const PassangerCar = function(brand, model, maxTank, typeFuel = 'petrol') {
  Car.call(this, brand, model, maxTank);
  this.typeFuel - typeFuel;
  this.typeCar = 'passanger'
};

const Truck = function(brand, model, maxTank, typeFuel = 'petrol') {
  Car.call(this, brand, model, maxTank);
  this.typeFuel - typeFuel;
  this.typeCar = 'truck'
};


// PassangerCar.prototype = new Car();
// PassangerCar.prototype.constructor = PassangerCar;

Object.setPrototypeOf(PassangerCar.prototype, Car.prototype);

const bmw1 = new PassangerCar('BMW', 'X7', 80, 'diesel');

const mazda1 = new PassangerCar('Mazda', 'cx-5', 55);

Object.setPrototypeOf(Truck.prototype, Car.prototype);
const man = new Truck('MAN', 'TGS', 400);
console.log(man.needPetrol());

console.log(mazda1);
console.log(bmw1.needPetrol());

// console.log(bmw1.__proto__.constructor === PassangerCar);
// console.log(bmw1.__proto__.__proto__ === Car.prototype);
// console.log(PassangerCar.prototype === Car.prototype);

// console.log(bmw1.__proto__ === PassangerCar.prototype);

//  Метод, проверяет является ли объект экземпляром класса:
console.log(bmw1 instanceof PassangerCar);
console.log(bmw1 instanceof Car);
console.log(bmw1 instanceof Truck);