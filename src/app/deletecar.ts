import { deleteCarAPI } from '../api/api';
import { renderGarageDB, renderCurrentGarageEls, renderCarsFromDB } from '../views/garage';
import { IClickBtnEvent } from '../data/interfaces';
import { updatePage, store } from '../data/storefordata';
import { getGarageBlockCleared } from './additional-functions';

// Машинка удаляется, но только один раз - для повторного удаления нужно обновить страницу

export const getBtnEvent: IClickBtnEvent = (event: Event): {
  target: HTMLButtonElement;
  carID: number;
} => {
  const target = event.target as HTMLButtonElement;
  const carIdString = target.dataset.carId;
  const carID = carIdString ? parseInt(carIdString, 10) : 0;
  return { target, carID };
};

export const removeCar: (event: Event) => Promise<void> = async (event: Event): Promise<void> => {
  const { carID } = getBtnEvent(event);
  getGarageBlockCleared();
  await deleteCarAPI(carID);
  await updatePage();
  renderGarageDB(store.carsCount, store.carPage);
  renderCurrentGarageEls(store.cars);
  renderCarsFromDB(store.cars);
};

export const listenerDeleteCar: () => void = (): void => {
  const removeCarBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-remove');
  if (removeCarBtns.length === null) {
    throw new Error('There is no remove btn!');
  } else {
    Array.from(removeCarBtns).forEach((item: HTMLElement): void => {
      item.addEventListener('click', (event: Event) => {
        removeCar(event)
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            throw new Error('Error while removing car');
          });
      });
    });
  }
};

function deleteListener(): void {
  try {
    listenerDeleteCar();
  } catch (error) {
    throw new Error('There is an error in delete car listener!');
  }
}

export { deleteListener };
