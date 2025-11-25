import axios from 'axios';
import Constants from 'expo-constants';

// Try multiple ways to access the API key
const OPENWEATHER_API_KEY = 
  Constants.expoConfig?.extra?.OPENWEATHER_API_KEY || 
  Constants.manifest?.extra?.OPENWEATHER_API_KEY ||
  '1bf8844badbd0bb228b57e8d43c13eeb'; // Fallback to hardcoded key

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

console.log('OPENWEATHER_API_KEY:', OPENWEATHER_API_KEY);
console.log('API Key length:', OPENWEATHER_API_KEY?.length);
console.log('Constants.expoConfig:', Constants.expoConfig);
console.log('API Key length:', OPENWEATHER_API_KEY?.length);

// Type for location parameter
type LocationParam = string | { lat: number; lon: number };

// Function to fetch current weather data (supports city name or coordinates)
export async function fetchCurrentWeather(location: LocationParam) {
  try {
    const params: any = {
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'es',
    };

    // If location is an object with lat/lon, use coordinates
    if (typeof location === 'object' && 'lat' in location && 'lon' in location) {
      params.lat = location.lat;
      params.lon = location.lon;
      console.log('Fetching weather for coordinates:', location);
    } else {
      // Otherwise use city name
      params.q = location;
      console.log('Fetching weather for city:', location);
    }

    console.log('Request params:', params);
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, { params });
    console.log('Current weather response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching current weather:', error.message);
    console.error('Error response:', error.response?.data);
    throw error;
  }
}

// Function to fetch forecast data (supports city name or coordinates)
export async function fetchWeatherForecast(location: LocationParam) {
  try {
    const params: any = {
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'es',
    };

    // If location is an object with lat/lon, use coordinates
    if (typeof location === 'object' && 'lat' in location && 'lon' in location) {
      params.lat = location.lat;
      params.lon = location.lon;
      console.log('Fetching forecast for coordinates:', location);
    } else {
      // Otherwise use city name
      params.q = location;
      console.log('Fetching forecast for city:', location);
    }

    console.log('Forecast request params:', params);
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, { params });
    console.log('Forecast response status:', response.status);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching weather forecast:', error.message);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
}

// Transform API data to app format
function transformWeatherData(currentData: any, forecastData: any) {
  const weatherIcons: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };

  const getIcon = (iconCode: string) => weatherIcons[iconCode] || '🌤️';

  // Hourly forecast (next 8 hours)
  const hourlyForecast = forecastData.list.slice(0, 8).map((item: any, index: number) => ({
    time: index === 0 ? 'Ahora' : `${index}h`,
    tempC: Math.round(item.main.temp),
    icon: getIcon(item.weather[0].icon),
  }));

  // Weekly forecast (next 7 days)
  const dailyData: { [key: string]: any } = {};
  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
    const dayKey = date.toDateString();

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        temps: [],
        precip: 0,
      };
    }
    dailyData[dayKey].temps.push(item.main.temp);
    dailyData[dayKey].precip += item.rain?.['3h'] || 0;
  });

  const weeklyForecast = Object.values(dailyData).slice(0, 7).map((day: any) => ({
    day: day.day,
    tempMax: Math.round(Math.max(...day.temps)),
    tempMin: Math.round(Math.min(...day.temps)),
    precipMm: Math.round(day.precip),
  }));

  // Calculate flood risk factors
  const precipitationMm = currentData.rain?.['1h'] ? currentData.rain['1h'] * 24 : 0;
  const riverLevelM = precipitationMm > 30 ? 3.5 : 1.8; // Simulated river level

  // Generate flood alerts based on conditions
  const floodAlerts: string[] = [];
  if (precipitationMm > 30) {
    floodAlerts.push('Alta precipitación detectada - riesgo de escorrentía');
  }
  if (riverLevelM > 2.5) {
    floodAlerts.push('Nivel del río elevado - mantente alerta');
  }
  if (currentData.weather[0].main === 'Rain' && currentData.wind.speed > 15) {
    floodAlerts.push('Condiciones adversas - lluvia y viento fuerte');
  }

  return {
    location: currentData.name,
    temperatureC: currentData.main.temp,
    description: currentData.weather[0].description,
    precipitationMm,
    riverLevelM,
    humidity: currentData.main.humidity,
    windKph: Math.round(currentData.wind.speed * 3.6), // m/s to km/h
    condition: {
      text: currentData.weather[0].description,
      icon: getIcon(currentData.weather[0].icon),
    },
    floodAlerts: floodAlerts.length > 0 ? floodAlerts : ['No hay alertas activas'],
    hourlyForecast,
    weeklyForecast,
  };
}

// Main function to fetch and transform weather data
// Usage examples:
//   fetchWeather('London')
//   fetchWeather({ lat: 9.44872, lon: -75.84347 })
export async function fetchWeather(location: LocationParam = { lat: 9.44872, lon: -75.84347 }) {
  try {
    console.log('=== Starting weather fetch ===');
    console.log('Location:', location);
    
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(location),
      fetchWeatherForecast(location),
    ]);
    
    console.log('Weather data fetched successfully');
    return transformWeatherData(currentData, forecastData);
  } catch (error: any) {
    console.error('=== Error fetching weather data ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Location that failed:', location);
    
    if (error.response?.status === 404) {
      console.error('Location not found (404). Using fallback data.');
    } else if (error.response?.status === 401) {
      console.error('Invalid API key (401). Check your OpenWeatherMap key.');
    }
    
    // Return mock data as fallback
    console.log('Returning mock weather data as fallback');
    return getMockWeather();
  }
}

// Mock data fallback
function getMockWeather() {
  return {
    location: 'San Bernardo del Viento (Datos de ejemplo)',
    temperatureC: 22.5,
    description: 'Nublado con lluvias intermitentes',
    precipitationMm: 45.0,
    riverLevelM: 3.2,
    humidity: 86,
    windKph: 18,
    condition: { text: 'Light rain', icon: '🌧️' },
    floodAlerts: ['Creciente rápida en el río RíoSeco', 'Posible anegamiento en zona baja'],
    hourlyForecast: [
      { time: 'Ahora', tempC: 22, icon: '🌧️' },
      { time: '1h', tempC: 21, icon: '🌦️' },
      { time: '2h', tempC: 20, icon: '🌧️' },
      { time: '3h', tempC: 20, icon: '🌧️' },
      { time: '4h', tempC: 19, icon: '☁️' },
      { time: '5h', tempC: 18, icon: '⛅' },
      { time: '6h', tempC: 18, icon: '🌤️' },
      { time: '7h', tempC: 17, icon: '🌥️' }
    ],
    weeklyForecast: [
      { day: 'Lun', tempMax: 26, tempMin: 18, precipMm: 2 },
      { day: 'Mar', tempMax: 25, tempMin: 17, precipMm: 5 },
      { day: 'Mie', tempMax: 23, tempMin: 16, precipMm: 12 },
      { day: 'Jue', tempMax: 22, tempMin: 15, precipMm: 20 },
      { day: 'Vie', tempMax: 24, tempMin: 16, precipMm: 0 },
      { day: 'Sab', tempMax: 27, tempMin: 18, precipMm: 0 },
      { day: 'Dom', tempMax: 28, tempMin: 19, precipMm: 1 }
    ]
  };
}

// ========================================
// Placeholder for integrating another API
// ========================================
// Example: WeatherAPI.com integration
// 
// const WEATHERAPI_KEY = Constants.expoConfig?.extra?.WEATHERAPI_KEY;
// const WEATHERAPI_BASE_URL = 'https://api.weatherapi.com/v1';
//
// export async function fetchWeatherFromWeatherAPI(location: string) {
//   try {
//     const response = await axios.get(`${WEATHERAPI_BASE_URL}/forecast.json`, {
//       params: {
//         key: WEATHERAPI_KEY,
//         q: location,
//         days: 7,
//         aqi: 'no',
//         alerts: 'yes',
//       },
//     });
//     return transformWeatherAPIData(response.data);
//   } catch (error) {
//     console.error('Error fetching from WeatherAPI:', error);
//     throw error;
//   }
// }
//
// function transformWeatherAPIData(data: any) {
//   // Transform WeatherAPI data to app format
//   return {
//     location: data.location.name,
//     temperatureC: data.current.temp_c,
//     description: data.current.condition.text,
//     // ... add more transformations as needed
//   };
// }

