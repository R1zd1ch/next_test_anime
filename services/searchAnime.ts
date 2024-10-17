import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

export const searchAnime = async (query: string) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/app/search/releases?query=${query}`);
    return response.data;
  } catch (err) {
    console.log('ERROR SEARCH ANIME');
    throw new Error('Пиздец');
  }
};
