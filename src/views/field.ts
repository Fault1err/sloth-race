import { addInvisibility } from '../app/additional-functions';
import { createBtns, renderGarageRaceBtns } from '../components/view-buttons';
import { IBtns } from '../data/interfaces';

function createFormField(id: string): void {
  const garageField: HTMLElement | null = document.querySelector('.garage-field');
  const formContainer: HTMLDivElement = document.createElement('div');
  formContainer.classList.add('car-form');
  formContainer.id = `id-${id}`;
  if (garageField) {
    garageField.append(formContainer);
  }
}

function renderCarForm(id: string): void {
  const formContainer: HTMLElement | null = document.getElementById(`id-${id}`);
  const formCreated: HTMLFormElement = document.createElement('form');
  const textInput: HTMLInputElement = document.createElement('input');
  textInput.type = 'text';
  textInput.name = 'textInput';
  textInput.id = `id-text-${id}`;
  textInput.placeholder = 'Enter car name';
  formCreated.appendChild(textInput);
  const colorInput: HTMLInputElement = document.createElement('input');
  colorInput.type = 'color';
  colorInput.name = 'colorInput';
  colorInput.id = `id-color-${id}`;
  formCreated.appendChild(colorInput);
  const submitBtn: HTMLButtonElement = document.createElement('button');
  submitBtn.classList.add('view-btn');
  submitBtn.classList.add(`btn-${id}`);
  submitBtn.type = 'submit';
  submitBtn.textContent = `${id.toUpperCase()}`;
  formCreated.appendChild(submitBtn);
  formContainer?.appendChild(formCreated);
}

export default function createField(): void {
  const container: HTMLElement = document.createElement('div');
  document.body.append(container);
  container.classList.add('container');
  const garageField: HTMLElement = document.createElement('div');
  container.append(garageField);
  garageField.classList.add('winner-field');
  const winnerField: HTMLElement = document.createElement('div');
  container.append(winnerField);
  winnerField.classList.add('garage-field');
  const winWin = document.createElement('div');
  winWin.classList.add('win-win');
  winWin.classList.add('invisible');
  winnerField.append(winWin);
  const contBtn: string = garageField.className;
  const winBtn: string = winnerField.className;
  createBtns(contBtn);
  createBtns(winBtn);
  addInvisibility();
  createFormField('create');
  createFormField('edit');
  renderCarForm('create');
  renderCarForm('edit');
  const btn1: IBtns = { label: 'race' };
  const btn2: IBtns = { label: 'reset' };
  const btn3: IBtns = { label: 'add 100 cars' };
  renderGarageRaceBtns(btn1, btn2, btn3);
}
