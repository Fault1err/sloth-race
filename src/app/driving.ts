import {
  IDriveStart, IRaceWinners, IWinnerData, IWinnerNew,
} from '../data/interfaces';
import {
  driveAPI, saveWinnersAPI, startEngineAPI, stopEngineAPI,
} from '../api/api';
import { getWinnersStore, store } from '../data/storefordata';
import { renderWinnersView, getWinnerTable } from '../views/winners';

export async function startDriving(id: number): Promise<IDriveStart> {
  const { velocity, distance } = await startEngineAPI(id);
  const car = document.getElementById(`sloth-${id}`) as HTMLElement;
  const time: number = Math.round(distance / velocity);
  car.style.animationName = 'sloth-animation';
  car.style.animationDuration = `${time.toString()}ms`;
  const startBtn = document.getElementById(`btn-A-${id}`) as HTMLButtonElement;
  const stopBtn = document.getElementById(`btn-B-${id}`) as HTMLButtonElement;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  const { success } = await driveAPI(id);
  if (!success) {
    car.style.animationPlayState = 'paused';
  }
  return { success, id, time };
}

export async function stopDriving(id: number): Promise<void> {
  await stopEngineAPI(id);
  const car = document.getElementById(`sloth-${id}`) as HTMLElement;
  car.style.animationPlayState = 'initial';
  car.style.animationName = 'none';
  const startBtn = document.getElementById(`btn-A-${id}`) as HTMLButtonElement;
  const stopBtn = document.getElementById(`btn-B-${id}`) as HTMLButtonElement;
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

const getWinnerRace = async (
  promises: Promise<IRaceWinners>[],
  indexes: number[],
): Promise<IWinnerData | null> => {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failedIndex: number = indexes.findIndex((i) => i === id);
    promises.splice(failedIndex, 1);
    indexes.splice(failedIndex, 1);
    if (promises.length < 1) return null;
    return getWinnerRace(promises, indexes);
  }
  return { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (prom: (id: number) => Promise<IRaceWinners>) => {
  const promises: Promise<IRaceWinners>[] = store.cars.map(({ id }) => prom(id));
  const winner: IWinnerNew = (await getWinnerRace(
    promises,
    store.cars.map((car) => car.id),
  )) as IWinnerNew;
  return winner;
};

export const eventsAdded = function func(): void {
  const winWin = document.querySelector('.win-win') as HTMLDivElement;
  winWin.innerHTML = '';
  winWin.classList.add('invisible');

  const handleEventClick = (event: Event) => {
    const eventTarget = event.target as HTMLButtonElement;
    const raceBtn = document.querySelector('.btn-rac') as HTMLButtonElement;
    const resetBtn = document.querySelector('.btn-res') as HTMLButtonElement;

    if (eventTarget && eventTarget.classList.contains('btn-A')) {
      const id: number = parseInt(eventTarget.id.split('btn-A-')[1], 10);
      startDriving(id)
        .catch(() => {
          throw new Error('There is an error in driving!');
        });
    }

    if (eventTarget && eventTarget.classList.contains('btn-B')) {
      const id: number = parseInt(eventTarget.id.split('btn-B-')[1], 10);
      stopDriving(id)
        .catch(() => {
          throw new Error('There is an error in driving!');
        });
    }

    if (eventTarget.classList.contains('btn-res')) {
      eventTarget.disabled = true;
      store.cars.map(({ id }) => stopDriving(id));
      winWin.innerHTML = '';
      winWin.classList.add('invisible');
      raceBtn.disabled = false;
    }

    if (eventTarget.classList.contains('btn-rac')) {
      winWin.classList.add('invisible');
      eventTarget.disabled = true;
      resetBtn.disabled = false;
      race(startDriving)
        .then((winner: IWinnerNew) => {
          if (winner) {
            const winnerName: string = winner.name as string;
            winWin.innerHTML = `<h1>${winnerName} is the winner (${winner.time} sec)!</h1>`;
            winWin.classList.remove('invisible');
            saveWinnersAPI(winner)
              .then(getWinnersStore)
              .then(() => {
                const winTable = document.querySelector('.winner-wrapper');
                winTable?.remove();
                renderWinnersView();
                getWinnerTable();
              })
              .catch(() => {
                throw new Error('Error while saving winners!');
              });
          }
        })
        .catch(() => {
          throw new Error('Error during the race!');
        });
    }
  };

  document.body.addEventListener('click', handleEventClick);
};
