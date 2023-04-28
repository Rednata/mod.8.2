import { Column } from './column.js';
import { RenderStation } from './renderStation.js';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];
  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  get filling() {
    return this.#filling;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    this.createColumn();

    setInterval(() => {
      console.log(this);
      this.checkQueueToFilling();
    }, 2000);
  }

  createColumn() {
    for (const optionStation of this.typeStation) {
      const count = optionStation.count || 1;
      for (let i = 0; i < count; i++) {
        this.#filling.push(new Column(optionStation.type, optionStation.speed));
      }
    }

    if (this.renderApp) {
      console.log(this);
      this.renderStation = new RenderStation(this.renderApp, this);
    }
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling[j].car &&
            this.#queue[i].typeFuel === this.#filling[j].type) {
            console.warn(this.#filling[j].car);
            // const temp = this.#queue.splice(i, 1);
            // console.log(this.#queue);
            // console.warn(temp);
            // console.warn(temp[0]);
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    // console.warn(car);    
    const needPetrol = car.needPetrol;
    console.log('needPetrol: ', needPetrol);
    
    let nowTank = car.nowTank;

    const timerId = setInterval(() => {
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        console.log(car.getTitle(), ': Сейчас в бензобаке ', nowTank);
        clearInterval(timerId);
        const total = nowTank - needPetrol;
        car.fillUp();
        column.car = null;
        this.leaveClient({car, total});
      }
    }, 1000);

    // console.log(`Заправляем ${JSON.stringify(column.car)}`);

  }

  leaveClient({car, total}) {
    this.#ready.push(car);
    this.renderStation.renderStation();
    console.log(car.getTitle(), ':  Заправлено ',  total);
  }

  addCarQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
    console.log(`В очереди машина ${car.getTitle()}`);
  }
}
