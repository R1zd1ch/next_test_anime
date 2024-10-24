import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

export const getFranchises = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/franchises`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.log(`Ошибка в getFranchises, ${err.name || err}`);
    throw new Error('Ошибка в getFranchises');
  }
};

export const getFranchisesById = async (id: string) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/franchises/${id}`);
    return response.data;
  } catch (err: any) {
    console.log(`Ошибка в getFranchisesById, ${err.name || err}`);
    throw new Error('Ошибка в getFranchisesById');
  }
};

export const getFranchisesRandom = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/franchises/random`);
    return response.data;
  } catch (err: any) {
    console.log(`Ошибка в getFranchisesRandom, ${err.name || err}`);
    throw new Error('Ошибка в getFranchisesRandom');
  }
};

export const getFranchisesForRelease = async (releaseId: number) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/franchises/release/${releaseId}`);
    return response.data;
  } catch (err: any) {
    console.log(`Ошибка в получении франшиз для релиза, ${err.name || err}`);
    throw new Error('Ошибка в получении франшиз для релиза');
  }
};
