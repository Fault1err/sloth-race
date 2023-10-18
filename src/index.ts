import createField from './views/field';
import { renderGarageDB, renderCurrentGarageEls, renderCarsFromDB } from './views/garage';
import { renderWinnersView, getWinnerTable, winSortListener } from './views/winners';
import { getWinnersStore, updateCars, store } from './data/storefordata';
import { createListener } from './app/createcar';
import { deleteListener } from './app/deletecar';
import gen100Listener from './app/createrandomcars';
import updateListener from './app/updatecar';
import { eventsAdded } from './app/driving';
import { eventsLeftPagAdded, eventsRightPagAdded } from './app/garagepagination';
import { eventsWinPagAdded } from './app/winnerspaginations';

const renderApp: () => Promise<HTMLElement> = async (): Promise<HTMLElement> => {
  const body: HTMLElement | null = document.querySelector('body');

  if (body === null) {
    throw new Error('There is no body');
  }

  try {
    await updateCars();
    createField();
    renderGarageDB(store.carsCount, store.carPage);
    renderCurrentGarageEls(store.cars);
    renderCarsFromDB(store.cars);
    await getWinnersStore();
    renderWinnersView();
    getWinnerTable();
    createListener();
    deleteListener();
    gen100Listener();
    updateListener();
    eventsAdded();
    eventsRightPagAdded();
    eventsLeftPagAdded();
    eventsWinPagAdded();
    winSortListener();
  } catch (error) {
    throw new Error('There is an error');
  }
  return body;
};

document.addEventListener('DOMContentLoaded', () => {
  renderApp()
    .catch(() => {
      throw new Error('Error generating the app');
    });
});
