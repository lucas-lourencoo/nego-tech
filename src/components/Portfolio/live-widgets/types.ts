export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubActivityResponse = {
  total: number;
  contributions: ContributionDay[];
};

export type WeatherDay = {
  date: string;
  temperatureMax: number;
  weatherCode: number;
};

export type WeatherResponse = {
  location: {
    city: string;
    country: string;
  };
  timezone: string;
  current: {
    temperature: number;
    weatherCode: number;
  };
  forecast: WeatherDay[];
};
