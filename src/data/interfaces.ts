export interface IBtns {
  label: string;
}

export interface IGetWinnersAPI {
  ({
    page, limit, sort, order,
  }: TGetWinnersPars): Promise<IWinnersResponse>
}

export interface IWinnersData {
  number: number;
  car: string;
  name: string;
  wins: number;
  time: string;
}

export interface IWinnerData {
  name?: string;
  color?: string;
  id?: number;
  time: number;
}

export interface IWinnersResponse {
  items: IWinCar[];
  count: number;
}

export interface IWinCar extends IWin {
  car: ICar;
}

export interface IWinData {
  pageNum: number;
  sort?: TSort;
  order?: TOrder;
}

export interface IWin {
  id: number;
  wins: number;
  time: number;
}

export interface IGetCarAPI {
  (id: number): Promise<ICar>;
}

export interface IGetCarsAPI {
  (page: number): Promise<ICarsResponse>;
}

export interface ICarsResponse {
  items: ICar[];
  count: number;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export type TSort = 'id' | 'wins' | 'time';
export type TOrder = 'ASC' | 'DESC';

export interface IStore {
  carPage: number,
  cars: ICar[],
  carsCount: number,
  winnersPage: number;
  winnersNum: number;
  winners: IWinCar[];
  sortBy: null | string;
  sortOrder: null | string;
  carSelected: number | null;
}

export type TGetWinnersPars = {
  page: number;
  limit?: number;
  sort: string | null;
  order: string | null;
};

export interface ICarCreate {
  name: string;
  color: string;
}

export interface ICreateElsProp {
  (): {
    name: string;
    color: string;
  };
}

export interface IDeleteWinnerAPI {
  (id: number): Promise<void>;
}

export interface IClickBtnEvent {
  (event: Event): {
    target: HTMLButtonElement;
    carID: number;
  };
}

export interface ICarUpdate {
  name: string;
  color: string;
}

export interface ISelectBtnElement {
  (event: Event): {
    target: HTMLButtonElement;
    carID: number;
  }
}

export interface IUpdateEls {
  (): {
    textInput: HTMLInputElement;
    colorInput: HTMLInputElement;
    updateBtn: HTMLButtonElement;
    name: string;
    color: string;
  };
}

export interface ICarData {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export interface IDriveStart {
  success: boolean;
  id: number;
  time: number;
}

export interface IRaceWinners {
  success: boolean;
  id: number;
  time: number;
}

export interface IWinnerNew {
  name?: string;
  color?: string;
  id: number;
  time: number;
}
export interface IWinnerStatus {
  (id: number): Promise<number>;
}

export interface IGetWinnerAPI {
  (id: number): Promise<IWin>;
}

export interface INewWinner {
  (body: IWin): Promise<IWin>;
}

export interface IMakeSortingAPI {
  (sort: string | null, order: string | null): string;
}

export interface ICreateCarAPI {
  (text: ICarCreate): Promise<Response>;
}

export interface IDeleteCarAPI {
  (id: number): Promise<void>;
}

export interface IUpdateCarAPI {
  (body: ICarUpdate, id: number) : Promise<void>
}

export interface IStartEngineAPI {
  (id: number): Promise<ICarData>;
}

export interface IStopEngineAPI {
  (id: number): Promise<ICarData>;
}

export interface IDriveAPI {
  (id: number): Promise<DriveResponse>;
}

export interface IUpdateWinnerAPI {
  (id: number, body: IWin): Promise<void>;
}

export interface ICreateWinnerAPI {
  (text: IWin): Promise<Response>;
}

export interface ISaveWinnerAPI {
  ({ id, time }: IWinnerNew): Promise<void>
}
