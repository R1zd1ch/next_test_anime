import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL as string;

export const getVideosAnime = async (releaseEpisodeId) => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/realeses/episodes/${releaseEpisodeId}`,
    );
    return response.data;
  } catch (err) {
    console.log('ERROR GET EPISODE');
    throw new Error('Пиздец, эпизод не найден');
  }
};
