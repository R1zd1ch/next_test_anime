import { getFranchisesById } from '@/services/getFranchises';
import FranchisePage from '@/components/Franchises/FranchisesPage';

export interface FranchiseElement {
  id: string;
  name: string;
  name_english: string;
  rating: number;
  last_year: number;
  first_year: number;
  total_releases: number;
  total_episodes: number;
  total_duration: string;
  total_duration_in_seconds: number;
  image: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
  franchise_releases: ReleaseElement[];
}

export interface ReleaseElement {
  id: string;
  sort_order: number;
  release_id: number;
  franchise_id: string;
  release: {
    id: number;
    type: {
      value: string;
      description: string;
    };
    year: number;
    name: {
      main: string;
      english: string;
      alternative: string;
    };
    alias: string;
    season: {
      value: string;
      description: string;
    };
    poster: {
      src: string;
      thumbnail: string;
      optimized: {
        src: string;
        thumbnail: string;
      };
    };
    fresh_at: string;
    created_at: string;
    updated_at: string;
    is_ongoing: boolean;
    age_rating: {
      value: string;
      label: string;
      is_adult: boolean;
      description: string;
    };
    publish_day: {
      value: string;
      description: string;
    };
    description: string;
    notification: string;
    episodes_total: number;
    external_player: string;
    is_in_production: boolean;
    is_blocked_by_geo: boolean;
    episodes_are_unknown: boolean;
    is_blocked_by_copyrights: boolean;
    added_in_users_favorites: number;
    average_duration_of_episode: number;
  };
}

const Home = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const franchiseData: FranchiseElement = await getFranchisesById(id);
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left pt-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Релизы жанра</h1>
        <h2 className="text-neutral-500 font-semibold">Список релизов жанра</h2>
      </header>
      <FranchisePage franchise={franchiseData}></FranchisePage>
    </div>
  );
};

export const runtime = 'edge';
export default Home;
