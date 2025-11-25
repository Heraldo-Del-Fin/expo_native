export type WeatherShape = {
  precipitationMm: number;
  riverLevelM: number;
  floodAlerts?: string[];
};

/**
 * Simple heuristic to determine flood risk.
 * Returns true when precipitation or river level exceed thresholds.
 */
export function isFloodRisk(weather: WeatherShape) {
  if (!weather) return false;
  return (weather.precipitationMm ?? 0) > 30 || (weather.riverLevelM ?? 0) > 2.5;
}

export function getFloodMessages(weather: WeatherShape) {
  const msgs: string[] = [];
  if ((weather.precipitationMm ?? 0) > 30) msgs.push('Precipitación alta — posible escorrentía e inundaciones.');
  if ((weather.riverLevelM ?? 0) > 2.5) msgs.push('Nivel del río elevado — vigila las riberas.');
  if (weather.floodAlerts && weather.floodAlerts.length) msgs.push(...weather.floodAlerts);
  return msgs;
}
