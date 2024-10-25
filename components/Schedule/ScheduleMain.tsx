'use client';
import ScheduleList from './ScheduleList';

export interface Schedule {
  release: Release;
  new_release_episode: NewReleaseEpisode;
  new_release_episode_ordinal: number;
}

export interface Release {
  id: number;
  type: ReleaseType;
  year: number;
  name: ReleaseName;
  alias: string;
  season: Season;
  poster: Poster;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: AgeRating;
  publish_day: PublishDay;
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
}

interface ReleaseType {
  value: string;
  description: string;
}

interface ReleaseName {
  main: string;
  english: string;
  alternative: string;
}

interface Season {
  value: string;
  description: string;
}

interface Poster {
  src: string;
  thumbnail: string;
  optimized: OptimizedPoster;
}

interface OptimizedPoster {
  src: string;
  thumbnail: string;
}

interface AgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

interface PublishDay {
  value: string;
  description: string;
}

interface NewReleaseEpisode {
  id: string;
  name: string;
  ordinal: number;
  opening: TimeFrame;
  ending: TimeFrame;
  preview: Preview;
  hls_480: string;
  hls_720: string;
  hls_1080: string;
  duration: number;
  rutube_id: string;
  youtube_id: string;
  updated_at: string;
  sort_order: number;
  name_english: string;
}

interface TimeFrame {
  start: number;
  stop: number;
}

interface Preview {
  src: string;
  thumbnail: string;
  optimized: OptimizedPreview;
}

interface OptimizedPreview {
  src: string;
  thumbnail: string;
}

const Schedules = () => {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left py-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Расписание выхода новых эпизодов</h1>
        <h2 className="text-neutral-500 font-semibold">
          Следите за расписанием выхода новых эпизодов на этой странице
        </h2>
        <h2 className="text-neutral-500 font-semibold">
          Будьте в курсе последних обновлений и не пропустите ни одной серии любимого релиза!
        </h2>
      </header>
      <ScheduleList></ScheduleList>
    </div>
  );
};

export default Schedules;
