import type { Condition } from './types';

interface WeatherIconProps {
  condition: Condition;
}

const conditionIconClass: Record<Condition, string> = {
  sunny:  'fa-solid fa-sun',
  cloudy: 'fa-solid fa-cloud',
  rainy:  'fa-solid fa-cloud-rain',
  snowy:  'fa-solid fa-snowflake',
};

export default function WeatherIcon({ condition }: WeatherIconProps) {
  return (
    <i className={`wt-weather-icon ${conditionIconClass[condition]} wt-icon-${condition}`} />
  );
}
