import { getGarageBlockClearedByRemove } from './additional-functions';
import { updateCars, store } from '../data/storefordata';
import { renderGarageDB, renderCurrentGarageEls, renderCarsFromDB } from '../views/garage';

async function handleArrLeftClick(event: Event): Promise<void> {
  const eventTarget = event.target as HTMLButtonElement;
  if (eventTarget && eventTarget.classList.contains('arr-left')) {
    if (store.carPage === 0) {
      eventTarget.disabled = true;
    }
    if (store.carPage > 1) {
      eventTarget.disabled = false;
      store.carPage -= 1;
      await updateCars();
      getGarageBlockClearedByRemove();
      renderGarageDB(store.carsCount, store.carPage);
      renderCurrentGarageEls(store.cars);
      renderCarsFromDB(store.cars);
    }
  }
}

async function handleArrRightClick(event: Event): Promise<void> {
  const eventTarget = event.target as HTMLButtonElement;
  if (eventTarget && eventTarget.classList.contains('arr-right')) {
    store.carPage += 1;
    await updateCars();
    getGarageBlockClearedByRemove();
    renderGarageDB(store.carsCount, store.carPage);
    renderCurrentGarageEls(store.cars);
    renderCarsFromDB(store.cars);
  }
}

export const eventsRightPagAdded = function func(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    handleArrRightClick(event).catch(() => {
      throw new Error('Error in right pagination');
    });
  });
};

export const eventsLeftPagAdded = function func(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    handleArrLeftClick(event).catch(() => {
      throw new Error('Error in handleArrLeftClick');
    });
  });
};
