import { ICar } from '../data/interfaces';
import renderSloth from '../components/sloth';

export function getRoadTree(id: number): void {
  const garageEl: HTMLElement | null = document.querySelector(`.garage-el-bot-${id}`);
  const treeContainer: HTMLDivElement = document.createElement('div');
  treeContainer.classList.add('tree-wrapper');
  garageEl?.appendChild(treeContainer);
  treeContainer.innerHTML = '<img src="images/tree.png" alt="tree" width="70">';
}

export function renderGarageDB(count: number, startPage: number): void {
  const garageField: HTMLElement | null = document.querySelector('.garage-field');

  const container: HTMLDivElement = document.createElement('div');
  container.classList.add('heading-container');
  garageField?.append(container);
  if (container) {
    container.innerHTML = '';
  }
  const garageName: HTMLHeadingElement = document.createElement('h3');
  container?.append(garageName);
  garageName.innerHTML = `Garage (${count})`;
  const arrContainer: HTMLDivElement = document.createElement('div');
  container?.append(arrContainer);
  arrContainer.classList.add('arrow-container');
  const leftArr: HTMLButtonElement = document.createElement('button');
  leftArr.innerHTML = 'Previous';
  leftArr.classList.add('arrow');
  leftArr.classList.add('arr-left');
  const rightArr: HTMLButtonElement = document.createElement('button');
  rightArr.innerHTML = 'Next';
  rightArr.classList.add('arrow');
  rightArr.classList.add('arr-right');
  rightArr.classList.add('view-btn');
  leftArr.classList.add('view-btn');
  const garagePageCount: HTMLHeadingElement = document.createElement('h4');
  arrContainer?.append(leftArr);
  arrContainer?.append(garagePageCount);
  arrContainer?.append(rightArr);
  garagePageCount.innerHTML = `Page (${startPage})`;
}

export function renderCarsFromDB(cars: ICar[]): void {
  cars.forEach((car: ICar) => {
    const garageElBot: HTMLElement | null = document.querySelector(`.garage-el-bot-${car.id}`);

    if (garageElBot) {
      renderSloth(car.color, car.id);
      getRoadTree(car.id);
    }
  });
}

export function renderCurrentGarageEls(cars: ICar[]): void {
  const garageField: HTMLElement | null = document.querySelector('.garage-field');
  const garageElsContainer: HTMLDivElement = document.createElement('div');
  garageElsContainer.classList.add('garage-els-wrapper');
  garageField?.append(garageElsContainer);

  if (garageElsContainer) {
    garageElsContainer.innerHTML = '';

    cars.forEach((car: ICar) => {
      const garageEl: HTMLDivElement = document.createElement('div');
      garageEl.classList.add('garage-car-block');
      garageElsContainer?.append(garageEl);

      const garageElTop: HTMLDivElement = document.createElement('div');
      garageElTop.classList.add('garage-el-top');
      garageElTop.classList.add(`garage-el-top-${car.id}`);
      garageEl.append(garageElTop);

      const btn1: HTMLButtonElement = document.createElement('button');
      btn1.textContent = 'Save changes of EDIT btn here';
      btn1.classList.add('view-btn-car');
      btn1.classList.add('btn-select');
      btn1.id = `btn-select-${car.id}`;
      btn1.setAttribute('value', `${car.id}`);
      btn1.setAttribute('data-car-id', `${car.id}`);
      const btn2: HTMLButtonElement = document.createElement('button');
      btn2.classList.add('view-btn-car');
      btn2.classList.add('btn-remove');
      btn2.textContent = 'Remove';
      btn2.setAttribute('data-car-id', `${car.id}`);
      garageElTop.append(btn1, btn2);
      const garageElBot: HTMLDivElement = document.createElement('div');
      garageElBot.classList.add('garage-el-bot');
      garageElBot.classList.add(`garage-el-bot-${car.id}`);
      garageElBot.id = `garage-el-bot-${car.id}`;
      garageEl.append(garageElBot);

      const btn3: HTMLButtonElement = document.createElement('button');
      btn3.textContent = 'Start';
      btn3.classList.add('view-btn-ab');
      btn3.classList.add('btn-A');
      btn3.id = `btn-A-${car.id}`;

      const btn4: HTMLButtonElement = document.createElement('button');
      btn4.textContent = 'Stop';
      btn4.classList.add('view-btn-ab');
      btn4.classList.add('btn-B');
      btn4.id = `btn-B-${car.id}`;

      garageElTop.append(btn3, btn4);

      const carName: HTMLHeadElement = document.createElement('h4');
      carName.innerHTML = `${car.name}`;
      garageElTop.append(carName);
    });
  }
}
