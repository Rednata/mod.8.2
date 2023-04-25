'use strict';

const Goods = function (price, name, discount = 0) {
  this.name = name;
  this.price = price;
  this.discount = discount;
};

const FoodGoods = function(price, name, discount = 0, calories) {
  Goods.call(this, price, name, discount, calories);
  this.calories = calories;
}

const ClothingGoods = function(price, name, discount = 0, material) {
  Goods.call(this, price, name, discount, material);
  this.material = material;
};

const TechnicsGoods = function(price, name, discount = 0, type) {
  Goods.call(this, price, name, discount, type);
  this.type = type;  
}

const Cart = function(arr = []) {
  this.goods = arr;
  this.totalPrice = 0;
  this.count = 0;
}

Cart.prototype.increaseCount = function() {
  this.count++;
};

Cart.prototype.addGoods = function(item) {  
  this.goods.push(item);
  this.increaseCount();
  };

Cart.prototype.calculateGoodsPrice = function() {
  const sum = this.goods.reduce((acc, item) => {
    const price = item.price - (item.price * item.discount) / 100;
    return acc += price;
  }, 0);
  this.totalPrice = sum;
}

Cart.prototype.getTotalPrice = function() {
  return this.totalPrice;
}

Cart.prototype.clear = function() {
  this.goods = [];
  this.totalPrice = 0;
  this.count = 0;
}

Cart.prototype.print = function() {
  console.log('Ваша корзина: ',JSON.stringify(this.goods));
  console.log('Общая стоимость корзины: ', this.totalPrice);
}

const banana = new Goods(80, 'banana', 5);
const fitnessBread = new FoodGoods(50, 'fitnessBread', 0, 30);
const gloves = new ClothingGoods(1000, 'gloves', 10, 'leather');
const kettle = new TechnicsGoods(2000, 'kettle', 20, 'electric');

const currentCart = new Cart();
currentCart.addGoods(banana);
currentCart.addGoods(fitnessBread);
currentCart.addGoods(gloves);
currentCart.addGoods(kettle);

currentCart.calculateGoodsPrice();
currentCart.print();

