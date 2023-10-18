import { store, getWinnersStore } from '../data/storefordata';

export function getWinnerHeading(): void {
  const block: HTMLElement | null = document.querySelector('.winner-wrapper');
  const winnerHeading: HTMLDivElement = document.createElement('h2');
  block?.append(winnerHeading);
  winnerHeading.innerHTML = `Winners (${store.winnersNum})`;
  const arrContainer: HTMLDivElement = document.createElement('div');
  block?.append(arrContainer);
  arrContainer.classList.add('arrow-container-win');
  const leftArr: HTMLButtonElement = document.createElement('button');
  leftArr.innerHTML = 'Previous page';
  leftArr.classList.add('arrow-win');
  leftArr.classList.add('arr-left-win');
  const rightArr: HTMLButtonElement = document.createElement('button');
  rightArr.innerHTML = 'Next page';
  rightArr.classList.add('arrow-win');
  rightArr.classList.add('arr-right-win');
  rightArr.classList.add('view-btn');
  leftArr.classList.add('view-btn');
  arrContainer?.append(leftArr);
  arrContainer?.append(rightArr);
  const winnerPageCount: HTMLHeadingElement = document.createElement('h3');
  arrContainer?.append(winnerPageCount);
  block?.append(winnerPageCount);
  winnerPageCount.innerHTML = `Page (${store.winnersPage})`;
}

export function getWinnerTable(): void {
  const winnerField: HTMLElement | null = document.querySelector('.winner-wrapper');
  const table: HTMLTableElement = document.createElement('table');
  winnerField?.append(table);
  table.classList.add('winner-table');
  table.innerHTML = `
   <thead>
    <th>#</th>
    <th>Sloth image</th>
    <th>Name</th>
    <th class="table-btn wins-col">Wins</th>
    <th class="table-btn time-col">Best time in sec</th>
  </thead>
  <tbody>
  ${store.winners
    .map(
      (win, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><?xml version="1.0" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
         "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="31.000000pt" height="31.000000pt" viewBox="0 0 311.000000 211.000000"
         preserveAspectRatio="xMidYMid meet">
    
        <g transform="translate(0.000000,211.000000) scale(0.100000,-0.100000)"
        fill="${win.car.color}" stroke="none">
        <path d="M2587 1954 c-1 -1 -81 -5 -177 -9 -96 -4 -186 -9 -200 -10 -14 -2
        -36 -4 -50 -6 -34 -3 151 -16 275 -19 80 -2 92 -4 60 -10 -22 -5 -58 -15 -80
        -23 -22 -8 -96 -17 -164 -21 -69 -4 -127 -9 -130 -11 -2 -3 31 -6 75 -7 43 0
        84 -2 89 -3 6 -2 30 -4 55 -5 26 -2 35 -5 22 -7 -13 -3 -56 -22 -95 -43 -73
        -40 -198 -77 -337 -102 -130 -23 -396 -16 -610 15 -103 16 -239 29 -305 30
        -119 2 -517 -11 -564 -19 -14 -2 -77 -4 -141 -5 -150 -1 -184 -18 -40 -20 58
        0 119 -2 135 -4 17 -2 89 -4 162 -6 72 -2 126 -7 120 -11 -7 -4 -27 -8 -45 -8
        -18 0 -49 -8 -70 -19 -29 -15 -71 -20 -195 -26 -87 -4 -156 -9 -154 -11 2 -2
        102 -7 223 -10 120 -4 220 -8 222 -9 1 -1 -46 -8 -105 -14 -107 -12 -108 -13
        -152 -54 -122 -117 -168 -271 -125 -418 84 -287 363 -436 781 -415 73 3 133 4
        133 0 0 -10 -124 -61 -190 -78 -36 -9 -110 -19 -165 -22 -127 -8 -221 11 -332
        66 -44 22 -86 40 -92 40 -19 0 -12 -38 15 -93 44 -87 71 -117 106 -117 17 0
        28 -3 24 -7 -10 -10 -12 -10 -98 -12 -39 0 -69 -3 -67 -5 2 -2 40 -7 84 -11
        44 -4 87 -13 95 -20 28 -24 79 -45 112 -46 18 0 42 -4 53 -8 18 -7 -187 -19
        -390 -22 l-90 -2 110 -8 c61 -5 250 -10 420 -11 l310 -3 90 28 c120 37 253 97
        330 147 50 33 68 39 82 32 10 -6 51 -44 90 -86 52 -55 80 -76 97 -76 29 0 116
        69 222 174 72 73 167 226 213 344 30 76 26 83 -10 16 -36 -69 -116 -178 -183
        -249 l-48 -50 51 65 c28 36 51 69 51 75 0 5 14 37 30 70 41 84 37 89 -11 14
        -48 -75 -60 -89 -53 -63 4 16 -11 29 -75 67 -172 103 -312 153 -506 181 -60 9
        -121 17 -135 20 -14 2 22 4 80 4 183 3 326 -26 521 -103 l46 -18 36 28 c20 15
        94 94 163 176 159 188 220 237 381 306 68 29 129 53 134 53 5 0 9 5 9 10 0 6
        -12 10 -26 10 -34 0 -64 17 -64 36 0 34 54 85 125 119 86 41 100 55 91 91 -8
        31 -64 57 -104 48 -79 -19 -146 -77 -184 -159 l-23 -50 -3 37 c-7 87 39 163
        129 213 46 25 65 30 129 30 41 0 102 -4 135 -9 l60 -9 -30 33 c-58 62 -159 94
        -285 88 -39 -1 -72 -3 -73 -4z"/>
        <path d="M2914 1745 c-24 -37 -15 -121 17 -147 l24 -20 -37 6 c-45 6 -49 -8
        -8 -29 41 -21 67 -19 95 10 21 21 25 33 25 88 0 50 -5 70 -21 91 -27 35 -72
        35 -95 1z"/>
        <path d="M755 224 c-100 -9 -279 -35 -295 -44 -8 -5 -12 -10 -9 -10 3 0 31 -5
        63 -11 192 -35 452 -43 856 -24 63 3 237 10 385 16 149 6 284 12 300 14 17 2
        45 4 63 4 18 1 31 5 28 10 -3 5 -47 9 -98 10 -51 1 -106 4 -123 5 -16 2 -122
        7 -235 11 -113 4 -225 9 -250 10 -84 6 -635 13 -685 9z"/>
        </g>
        </svg></td>
        <td>${win.car.name}</td>
        <td>${win.wins}</td>
        <td>${win.time}</td>
      </tr>
      `,
    )
    .join(' ')}
  </tbody>`;
}

export function renderWinnersView(): void {
  const winnerField: HTMLElement | null = document.querySelector('.winner-field');
  const winnerBlock: HTMLDivElement = document.createElement('div');
  winnerBlock.classList.add('winner-wrapper');
  winnerField?.append(winnerBlock);
  getWinnerHeading();
}

const winSort = async (sortBy: string): Promise<void> => {
  store.sortBy = sortBy;
  if (store.sortOrder === 'asc') {
    store.sortOrder = 'desc';
  } else {
    store.sortOrder = 'asc';
  }
  const container: HTMLElement | null = document.querySelector('.winner-wrapper');
  if (container) {
    container.remove();
  }
  try {
    await getWinnersStore();
    renderWinnersView();
    getWinnerTable();
  } catch (error) {
    throw new Error('There is sort error!');
  }
};

const winSortClick = (event: Event): void => {
  const target = event.target as HTMLElement;

  if (target.closest('.wins-col')) {
    winSort('wins').then(() => {
    }).catch(() => {
      throw new Error('Error sorting by wins:');
    });
  } else if (target.closest('.time-col')) {
    winSort('time').then(() => {

    }).catch(() => {
      throw new Error('Error sorting by time:');
    });
  }
};

export const winSortListener: () => void = (): void => {
  document.addEventListener('click', winSortClick);
};
