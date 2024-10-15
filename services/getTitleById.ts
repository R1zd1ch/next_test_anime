import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL as string;

export const getTitleById = async (id: number) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/title?id=${id}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log('Error getTitleById', err);
    throw new Error('TitleById error');
  }
};
