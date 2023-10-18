import { IBtns } from '../data/interfaces';

export function createBtns(fieldName: string): void {
  const btn1: HTMLButtonElement = document.createElement('button');
  const btn2: HTMLButtonElement = document.createElement('button');
  const field = document.querySelector(`.${fieldName}`) as HTMLElement;
  field?.append(btn1);
  field?.append(btn2);
  btn1.innerHTML = 'GARAGE';
  btn2.innerHTML = 'WINNERS';
  btn1.classList.add('view-btn');
  btn2.classList.add('view-btn');
  btn1.classList.add('view-btn-g');
  btn2.classList.add('view-btn-w');
  btn2.addEventListener('click', () => {
    const winnerField: HTMLElement | null = document.querySelector('.winner-field');
    winnerField?.classList.remove('invisible');
  });
  btn1.addEventListener('click', () => {
    const winnerField: HTMLElement | null = document.querySelector('.winner-field');
    winnerField?.classList.add('invisible');
  });
}

export function renderGarageRaceBtns(...btns: IBtns[]): void {
  const garageField: HTMLElement | null = document.querySelector('.garage-field');
  const btnsContainer: HTMLDivElement = document.createElement('div');
  btnsContainer.classList.add('garage-btns-wrapper');
  garageField?.appendChild(btnsContainer);
  btns.forEach((btnText: IBtns) => {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('view-btn');
    btn.classList.add(`btn-${btnText.label.substring(0, 3)}`);
    btn.id = btnText.label.substring(0, 3);
    btn.textContent = btnText.label.toUpperCase();
    btnsContainer.appendChild(btn);
  });
}
