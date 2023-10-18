import { createCarAPI } from '../api/api';
import { ICreateElsProp } from '../data/interfaces';

const createCarNameAndColor: ICreateElsProp = (): {
  name: string;
  color: string;
} => {
  const textForm: HTMLInputElement | null = document.getElementById('id-text-create') as HTMLInputElement | null;
  const colorForm: HTMLInputElement | null = document.getElementById('id-color-create') as HTMLInputElement | null;
  if (textForm === null || colorForm === null) {
    throw new Error('There is an error in form of creating car!');
  }
  const name: string = textForm.value;
  const color: string = colorForm.value;
  return {
    name,
    color,
  };
};

export const generateCarProps = (name: string, color: string) => ({
  name,
  color,
});

const createCar: () => Promise<void> = async (): Promise<void> => {
  const { name, color } = createCarNameAndColor();
  await createCarAPI(generateCarProps(name, color));
};

export const listenerCreateCar: () => void = (): void => {
  const createCarBtn: HTMLElement | null = document.querySelector('.btn-create');
  if (createCarBtn === null) {
    throw new Error('There is no btn!');
  } else {
    createCarBtn.addEventListener('click', () => {
      createCar().then(() => {
      }).catch(() => {
        throw new Error('There is an error in creating car!');
      });
    });
  }
};

export const createListener: () => void = (): void => {
  try {
    listenerCreateCar();
  } catch (error) {
    throw new Error('There is an error in create car listener!');
  }
};
