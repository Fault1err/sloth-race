import { updateCarAPI, getCarAPI } from '../api/api';
import { generateCarProps } from './createcar';
import { updateCars, store } from '../data/storefordata';
import { renderCurrentGarageEls, renderCarsFromDB } from '../views/garage';
import { ISelectBtnElement, IUpdateEls } from '../data/interfaces';

export const getSelectBtn: ISelectBtnElement = (event: Event): {
  target: HTMLButtonElement;
  carID: number;
} => {
  const target = event.target as HTMLButtonElement;
  const carID = Number(target.value);
  return { target, carID };
};

export const updateEls: IUpdateEls = (): { textInput: HTMLInputElement,
  colorInput: HTMLInputElement, updateBtn: HTMLButtonElement, name: string,
  color: string;
} => {
  const textInput: HTMLInputElement | null = document.getElementById('id-text-edit') as HTMLInputElement | null;
  const colorInput: HTMLInputElement | null = document.getElementById('id-color-edit') as HTMLInputElement | null;
  const updateBtn: HTMLButtonElement | null = document.querySelector('.btn-edit');
  if (textInput === null || colorInput === null || updateBtn === null) {
    throw new Error('There is no form!');
  }
  const name: string = textInput.value;
  const color: string = colorInput.value;
  return {
    textInput, colorInput, updateBtn, name, color,
  };
};

export const selectCar: (event: Event) => Promise<void> = async (event: Event): Promise<void> => {
  const { carID } = getSelectBtn(event);
  const car = await getCarAPI(carID || -1);
  if (car !== null) {
    const { textInput, colorInput, updateBtn } = updateEls();
    textInput.value = car.name;
    colorInput.value = car.color;
    updateBtn.value = `${carID}`;
  }
};

export const selectBtnsListener = (): void => {
  const selectCarBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.select');
  if (selectCarBtns === null) {
    throw new Error('There is no select btn!');
  } else {
    Array.from(selectCarBtns).forEach((item: HTMLElement): void => item.addEventListener('click', () => selectCar));
  }
};

export const updateCar = async (event: Event): Promise<void> => {
  const { carID } = getSelectBtn(event);
  const {
    textInput, colorInput, updateBtn, name, color,
  } = updateEls();

  try {
    await updateCarAPI(generateCarProps(name, color), carID);
    textInput.value = '';
    colorInput.value = '#000000';
    updateBtn.value = '';
    const garageField: HTMLElement | null = document.querySelector('.garage-els-wrapper');
    if (garageField) {
      garageField.innerHTML = '';
    }
    await updateCars();
    renderCurrentGarageEls(store.cars);
    renderCarsFromDB(store.cars);
  } catch (error) {
    throw new Error('Error update car');
  }
};

const updateCarListener: () => void = (): void => {
  const selectCarBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-select');
  if (!selectCarBtn) {
    throw new Error('There is no select btn');
  } else {
    Array.from(selectCarBtn).forEach((item: HTMLElement): void => {
      item.addEventListener('click', (event: Event) => {
        updateCar(event)
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            throw new Error('Error while update car');
          });
      });
    });
  }
};

const updateListener: () => void = (): void => {
  try {
    updateCarListener();
  } catch (error) {
    throw new Error('There is an error in create car listener!');
  }
};

export default updateListener;
