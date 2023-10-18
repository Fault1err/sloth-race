import { createCarAPI } from '../api/api';
import { ICarCreate } from '../data/interfaces';
import { updateCars, store } from '../data/storefordata';
import { renderGarageDB, renderCurrentGarageEls, renderCarsFromDB } from '../views/garage';
import { getGarageBlockClearedByRemove } from './additional-functions';

const carBrand: string[] = ['Audi', 'Lada', 'Niva', 'Ford', 'Nissan', 'Wolkswagen',
  'Chevrolet', 'Peugeot', 'Toyota', 'Renault'];

const carModel: string[] = ['100', '2107', 'Focus', 'Golf', 'Duster', 'Tiguan',
  'Bora', 'Passat', 'Taos', 'Beetle'];

const getRandName = (): string => {
  const brand: string = carBrand[Math.floor(Math.random() * carBrand.length)];
  const model: string = carModel[Math.floor(Math.random() * carModel.length)];
  return `${brand} ${model}`;
};

const getRandColor = (): string => {
  const range = 'ABCDEF0123456789';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += range[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generate100RandomCars = (countCars = 100): ICarCreate[] => new Array(countCars)
  .fill(0).map(() => (
    { name: getRandName(), color: getRandColor() }
  ));

async function gen100Cars(): Promise<void> {
  const cars: ICarCreate[] = generate100RandomCars();
  await Promise.all(cars.map(async (car) => createCarAPI(car)));
  await updateCars();
}

const gen100ListenerMain: () => void = (): void => {
  const genBtn: HTMLElement | null = document.getElementById('add');
  if (genBtn === null) {
    throw new Error('There is no btn!');
  } else {
    genBtn.addEventListener('click', () => {
      gen100Cars().then(() => {
        getGarageBlockClearedByRemove();
        renderGarageDB(store.carsCount, store.carPage);
        renderCurrentGarageEls(store.cars);
        renderCarsFromDB(store.cars);
      }).catch(() => {
        throw new Error('There is an error in creating 100 cars!');
      });
    });
  }
};

const gen100Listener: () => void = (): void => {
  try {
    gen100ListenerMain();
  } catch (error) {
    throw new Error('There is an error in create car listener!');
  }
};

export default gen100Listener;
