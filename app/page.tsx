import NewEpisodes from '@/components/MainPage/NewEpisodes';

export const runtime = 'edge';
// import AdSlider from '@/components/ADSlider';
import Schedule from '@/components/MainPage/Schedule';
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
