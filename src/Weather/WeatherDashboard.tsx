import { useState, useCallback } from 'react';
import { weatherData, cities } from './types';
import type { WeatherInfo } from './types';
import WeatherIcon from './WeatherIcon';

const conditionLabel: Record<string, string> = {
  sunny:  'Ensoleillé',
  cloudy: 'Nuageux',
  rainy:  'Pluvieux',
  snowy:  'Neigeux',
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="wt-stat-card">
      <div className="wt-stat-icon-wrap">
        <i className={icon} />
      </div>
      <div className="wt-stat-info">
        <span className="wt-stat-label">{label}</span>
        <span className="wt-stat-value">{value}</span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="wt-skeleton">
      <div className="wt-skel wt-skel-icon" />
      <div className="wt-skel wt-skel-temp" />
      <div className="wt-skel wt-skel-line" />
      <div className="wt-skel-grid">
        <div className="wt-skel wt-skel-stat" />
        <div className="wt-skel wt-skel-stat" />
        <div className="wt-skel wt-skel-stat" />
        <div className="wt-skel wt-skel-stat" />
      </div>
    </div>
  );
}

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>('Cotonou');
  const [data, setData] = useState<WeatherInfo>(weatherData['Cotonou']);
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const simulateLoad = useCallback((targetCity: string) => {
    setLoading(true);
    setTimeout(() => {
      setData(weatherData[targetCity]);
      setAnimKey(k => k + 1);
      setLoading(false);
    }, 1200);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
    simulateLoad(newCity);
  };

  const handleRefresh = () => simulateLoad(city);

  return (
    <div className="wt-page">

      {/* ── Header ── */}
      <header className="wt-header">
        <div className="wt-header-left">
          <h1 className="wt-title">
            <i className="fa-solid fa-cloud-sun wt-title-icon" />
            Météo Dashboard
          </h1>
          <p className="wt-subtitle">Données simulées · {cities.length} villes disponibles</p>
        </div>
        <div className="wt-header-right">
          <span className="wt-date-badge">
            <i className="fa-regular fa-calendar" />
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long', day: 'numeric', month: 'long',
            })}
          </span>
        </div>
      </header>

      {/* ── Controls ── */}
      <div className="wt-controls">
        <div className="wt-field">
          <label htmlFor="city-select" className="wt-field-label">
            <i className="fa-solid fa-location-dot" /> Ville
          </label>
          <div className="wt-select-wrap">
            <select
              id="city-select"
              className="wt-select"
              value={city}
              onChange={handleCityChange}
              disabled={loading}
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <i className="fa-solid fa-chevron-down wt-select-arrow" />
          </div>
        </div>

        <button
          id="refresh-btn"
          className={`wt-btn-refresh ${loading ? 'wt-btn-loading' : ''}`}
          onClick={handleRefresh}
          disabled={loading}
          aria-label="Actualiser les données météo"
        >
          <i className={`fa-solid fa-rotate-right ${loading ? 'wt-spin' : ''}`} />
          {loading ? 'Chargement…' : 'Actualiser'}
        </button>
      </div>

      {/* ── Weather card ── */}
      <div className={`wt-card`} key={animKey}>
        {loading ? <SkeletonCard /> : (
          <div className="wt-card-inner wt-fade-in">

            {/* Top row: city + icon */}
            <div className="wt-card-top">
              <div className="wt-card-meta">
                <h2 className="wt-city-name">{city}</h2>
                <span className={`wt-badge wt-badge-${data.condition}`}>
                  <WeatherIcon condition={data.condition} />
                  {conditionLabel[data.condition]}
                </span>
              </div>
              <div className="wt-big-icon-wrap">
                <i className={`wt-big-icon wt-icon-${data.condition} fa-solid ${
                  data.condition === 'sunny'  ? 'fa-sun'         :
                  data.condition === 'cloudy' ? 'fa-cloud'       :
                  data.condition === 'rainy'  ? 'fa-cloud-rain'  : 'fa-snowflake'
                }`} />
              </div>
            </div>

            {/* Temperature & Inline Stats */}
            <div className="wt-temp-row">
              <div className="wt-temp-wrap">
                <span className="wt-temp">{data.temp}</span>
                <span className="wt-temp-unit">°C</span>
              </div>

              <div className="wt-inline-stats">
                <StatCard
                  icon="fa-solid fa-droplet"
                  label="Humidité"
                  value={`${data.humidity}%`}
                />
                <StatCard
                  icon="fa-solid fa-cloud"
                  label="Condition"
                  value={conditionLabel[data.condition]}
                />
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
