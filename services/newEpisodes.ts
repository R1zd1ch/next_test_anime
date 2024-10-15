const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;
import axios from 'axios';

// export const getUpdatesReleases = async (limit = 10) => {
//   try {
//     const response = await axios.get(`${ANILIBRIA_API_URL}/title/updates?limit=${limit}`);
//     // console.log(response.data.list);
//     return response.data.list;
//   } catch (err) {
//     console.error('Error fetching new episodes:', err);
//     throw new Error('Failed to fetch data');
//   }
// };

export const getUpdatesReleases = async (limit = 10) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/releases/latest?limit=${limit}`);
    // console.log(response.data.list);
    return response.data;
  } catch (err) {
    console.error('Error fetching new episodes:', err);
    throw new Error('Failed to fetch data');
  }
};
