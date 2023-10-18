import {
  ICarsResponse,
  IGetCarAPI,
  IGetCarsAPI,
  ICar,
  IWinnersResponse,
  IWin,
  IWinCar,
  TGetWinnersPars,
  ICarCreate,
  IDeleteWinnerAPI,
  ICarUpdate,
  ICarData,
  DriveResponse,
  IWinnerStatus,
  IGetWinnerAPI,
  IWinnerNew,
  IMakeSortingAPI,
  IGetWinnersAPI,
  ICreateCarAPI,
  IDeleteCarAPI,
  IUpdateCarAPI,
  IStartEngineAPI,
  IStopEngineAPI,
  IDriveAPI,
  IUpdateWinnerAPI,
  ICreateWinnerAPI,
  ISaveWinnerAPI,
} from '../data/interfaces';

const url = 'http://127.0.0.1:3000';
const garageAPI = `${url}/garage`;
const engineAPI = `${url}/engine`;
const winnersAPI = `${url}/winners`;
const pageLimit = 7;

export const getCarAPI: IGetCarAPI = async (id: number): Promise<ICar> => {
  const resp: Response = await fetch(`${garageAPI}/${id}`);
  const carData: ICar = await resp.json() as ICar;
  return carData;
};

export const getCarsAPI: IGetCarsAPI = async (pagePag: number): Promise<ICarsResponse> => {
  const resp: Response = await fetch(`${garageAPI}?_page=${pagePag}&_limit=${pageLimit}`);
  const count: string | null = resp.headers.get('X-Total-Count');
  if (count === null) {
    throw new Error('X-Total-Count is null');
  }
  return {
    items: await resp.json() as ICar[],
    count: parseInt(count, 10),
  };
};

const makeSorting: IMakeSortingAPI = (sort: string | null, order: string | null): string => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
};

export const getWinnersAPI: IGetWinnersAPI = async ({
  page, limit = 10, sort, order,
}: TGetWinnersPars): Promise<IWinnersResponse> => {
  const resp: Response = await fetch(`${winnersAPI}?_page=${page}&_limit=${limit}&${makeSorting(sort, order)}`);
  const items = await resp.json() as IWinCar[];
  const count: string | null = resp.headers.get('X-Total-Count');
  if (count === null) {
    throw new Error('There is no count!');
  }
  return {
    items: await Promise.all(
      items.map(
        async (winner: IWin) => ({ ...winner, car: await getCarAPI(winner.id) }),
      ),
    ),
    count: parseInt(count, 10),
  };
};

export const createCarAPI: ICreateCarAPI = async (text: ICarCreate): Promise<Response> => {
  const resp: Response = await fetch(`${garageAPI}`, {
    method: 'POST',
    body: JSON.stringify(text),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error('Failed to create car.');
  }
  return resp;
};

export const deleteCarAPI: IDeleteCarAPI = async (id: number): Promise<void> => {
  const resp: Response = await fetch(`${garageAPI}/${id}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    throw new Error('Failed to delete car.');
  }
};

export const deleteWinnerAPI: IDeleteWinnerAPI = async (id: number): Promise<void> => {
  const resp: Response = await fetch(`${winnersAPI}/${id}`, { method: 'DELETE' });
  if (!resp.ok) {
    throw new Error('Failed to delete winner car');
  }
};

export const updateCarAPI: IUpdateCarAPI = async (body: ICarUpdate, id: number): Promise<void> => {
  const resp: Response = await fetch(`${garageAPI}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error('Failed to update car.');
  }
};

export const startEngineAPI: IStartEngineAPI = async (id: number): Promise<ICarData> => {
  const resp: Response = await fetch(`${engineAPI}?id=${id}&status=started`, { method: 'PATCH' });
  return resp.json() as Promise<ICarData>;
};

export const stopEngineAPI: IStopEngineAPI = async (id: number): Promise<ICarData> => {
  const resp: Response = await fetch(`${engineAPI}?id=${id}&status=stopped`, { method: 'PATCH' });
  return resp.json() as Promise<ICarData>;
};

export const driveAPI: IDriveAPI = async (id: number): Promise<DriveResponse> => {
  const res: Response = await fetch(`${engineAPI}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  if (res.status !== 200) {
    return { success: false };
  }
  const data = await res.json() as DriveResponse;
  return data;
};

export const getIsWinnerAPI: IWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winnersAPI}/${id}`)).status;

export const getWinnerAPI: IGetWinnerAPI = async (id: number): Promise<IWin> => {
  const resp: Response = await fetch(`${winnersAPI}/${id}`);
  const data = await resp.json() as IWin;
  return data;
};

export const updateWinnerAPI: IUpdateWinnerAPI = async (id: number, body: IWin): Promise<void> => {
  const resp: Response = await fetch(`${winnersAPI}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error('Failed to update winner.');
  }
};

export const createWinnerAPI: ICreateWinnerAPI = async (body: IWin): Promise<Response> => {
  const resp: Response = await fetch(`${winnersAPI}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    throw new Error('Failed to create winner.');
  }
  return resp;
};

export const saveWinnersAPI: ISaveWinnerAPI = async ({ id, time }: IWinnerNew) => {
  const winnerStatus: number = await getIsWinnerAPI(id);
  if (winnerStatus === 404) {
    await createWinnerAPI({ id, wins: 1, time });
  } else {
    const winner: IWin = await getWinnerAPI(id);
    await updateWinnerAPI(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
