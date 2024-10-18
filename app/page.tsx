import { NewEpisodes } from '@/components/NewEpisodes';

export const runtime = 'edge';
// import AdSlider from '@/components/ADSlider';
import Schedule from '@/components/Schedule';
const Home = () => {
  return (
    <>
      {/* <AdSlider /> */}
      <NewEpisodes></NewEpisodes>
      <Schedule></Schedule>
    </>
  );
};

export default Home;
