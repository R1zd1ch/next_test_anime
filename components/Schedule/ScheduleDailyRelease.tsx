import React from 'react';
import { Schedule } from './ScheduleMain';
import ScheduleCard from './ScheduleCard';

interface DailyReleasesProps {
  releases: Schedule[];
}

const ScheduleDailyRelease: React.FC<DailyReleasesProps> = ({ releases }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {releases.map((schedule, index) => (
        <ScheduleCard key={index} release={schedule.release} />
      ))}
    </div>
  );
};

export default ScheduleDailyRelease;
