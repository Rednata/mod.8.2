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

const PassangerCar = function(brand, model, maxTank, typeFuel = 'petrol') {
  Car.call(this, brand, model, maxTank);
  this.typeFuel = typeFuel;
  this.typeCar = 'passanger';
}

const Truck = function(brand, model, maxTank, typeFuel = 'diesel') {
  Car.call(this, brand, model, maxTank);
  this.typeFuel = typeFuel;
  this.typeCar = 'truck';
}

// PassangerCar.prototype = new Car();
// PassangerCar.prototype.constructor = PassangerCar;

Object.setPrototypeOf(PassangerCar.prototype, Car.prototype);
Object.setPrototypeOf(Truck.prototype, Car.prototype);

// const bmw = Car.from({
//   brand: 'BMW',
//   model: 'X7',
//   maxTank: 80
// })

const bmw = new PassangerCar('BMW', 'X7', 80, 'diesel');
const mazda = new PassangerCar('Mazda', 'cx-5', 55);

const man = new Truck('MAN', 'TGS', 400);
console.log('man: ', man);

console.log(man.needPetrol());


// const mazda = new Car('Mazda', 'cx-5', 55);
console.log('mazda: ', mazda);
// console.log('mazda: ', mazda.needPetrol());
// console.log('mazda: ', mazda.fillUp());
// console.log('mazda: ', mazda.needPetrol());

console.log('bmw: ', bmw);

console.log(bmw.__proto__.constructor === PassangerCar);
console.log(bmw.__proto__.__proto__ === Car.prototype);
console.log(PassangerCar.prototype.__proto__ === Car.prototype);

console.log(bmw.__proto__ === PassangerCar.prototype);
console.log(PassangerCar.prototype.constructor === PassangerCar);

console.log(PassangerCar.__proto__ === Function.prototype);
console.log(PassangerCar.__proto__.constructor === Function);

console.log(bmw instanceof PassangerCar);
console.log(man instanceof PassangerCar);
console.log(bmw instanceof Truck);
console.log(man instanceof Truck);
console.log(bmw instanceof Car);
console.log(man instanceof Car);



