import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

export const getTitleById = async (id: number) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/releases/${id}`);
    return response.data;
  } catch (err) {
    console.log('Error getTitleById', err);
    throw new Error('TitleById error');
  }
};
