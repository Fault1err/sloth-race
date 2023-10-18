import { updateCars, store, getWinnersStore } from '../data/storefordata';
import { getWinnerTable, renderWinnersView } from '../views/winners';

export const eventsWinPagAdded = function func() {
  document.body.addEventListener('click', (event) => {
    const eventTarget = event.target as HTMLButtonElement;
    if (eventTarget && eventTarget.classList.contains('arr-left-win')) {
      if (store.winnersPage === 0) {
        eventTarget.disabled = true;
      }
      if (store.winnersPage > 1) {
        eventTarget.disabled = false;
        store.winnersPage -= 1;
        const container: HTMLElement | null = document.querySelector('.winner-wrapper');
        if (container) {
          container.remove();
        }
        getWinnersStore()
          .then(() => {
            renderWinnersView();
            getWinnerTable();
          })
          .catch(() => {
            throw new Error('Error fetching winners store');
          });
      }
    }
    if (eventTarget && eventTarget.classList.contains('arr-right-win')) {
      store.winnersPage += 1;
      updateCars()
        .then(async () => {
          const container: HTMLElement | null = document.querySelector('.winner-wrapper');
          if (container) {
            container.remove();
          }
          await getWinnersStore();
          renderWinnersView();
          getWinnerTable();
        })
        .catch(() => {
          throw new Error('Error updating cars');
        });
    }
  });
};

export default { eventsWinPagAdded };
