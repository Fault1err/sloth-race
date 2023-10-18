import { IStore, IWinnersResponse } from './interfaces';
import { getCarsAPI, getWinnersAPI } from '../api/api';

export const store: IStore = {
  carPage: 1,
  cars: [],
  carsCount: 1,
  winnersPage: 1,
  winnersNum: 0,
  winners: [],
  sortBy: null,
  sortOrder: null,
  carSelected: null,
};

export const getWinnersStore = async (): Promise<void> => {
  const res: IWinnersResponse = await getWinnersAPI({
    page: store.winnersPage,
    sort: store.sortBy,
    order: store.sortOrder,
  });
  const { items } = res;
  const { count } = res;
  store.winners = items;
  store.winnersNum = count;
};

export const updateCars = async (): Promise<void> => {
  const { items, count } = await getCarsAPI(store.carPage);
  store.cars = items;
  store.carsCount = count;
};

export const updatePage = async (): Promise<void> => {
  await updateCars();
  await getWinnersStore();
};
