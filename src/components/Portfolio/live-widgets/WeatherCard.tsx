"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale, PortfolioContent } from "@/content/portfolio";
import { Pin } from "../icons";
import styles from "../styles.module.css";
import type { WeatherResponse } from "./types";

type WeatherCardProps = {
  locale: Locale;
  copy: PortfolioContent["widgets"]["weather"];
};

const fallbackLocation = {
  latitude: -20.4428,
  longitude: -54.6464,
  city: "Campo Grande",
  country: "Brazil",
};
const weatherCacheKey = "portfolio-weather";

type IpLocation = typeof fallbackLocation;

function weatherKey(
  code: number,
): keyof PortfolioContent["widgets"]["weather"]["conditions"] {
  if (code === 0) return "clear";
  if (code <= 3) return "cloudy";
  if (code <= 48) return "fog";
  if (code <= 57) return "drizzle";
  if (code <= 67 || (code >= 80 && code <= 82)) return "rain";
  if (code <= 77 || (code >= 85 && code <= 86)) return "snow";
  return "storm";
}

async function findLocation(signal: AbortSignal): Promise<IpLocation> {
  try {
    const response = await fetch("https://ipapi.co/json/", { signal });
    if (!response.ok) return fallbackLocation;
    const data = (await response.json()) as {
      latitude?: number;
      longitude?: number;
      city?: string;
      country_name?: string;
    };
    if (
      !Number.isFinite(data.latitude) ||
      !Number.isFinite(data.longitude)
    ) {
      return fallbackLocation;
    }
    return {
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      city: data.city || fallbackLocation.city,
      country: data.country_name || fallbackLocation.country,
    };
  } catch {
    return fallbackLocation;
  }
}

export default function WeatherCard({ locale, copy }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    if (!desktop.matches) return;

    const controller = new AbortController();

    const cached = window.localStorage.getItem(weatherCacheKey);
    if (cached) {
      try {
        const cachedWeather = JSON.parse(cached) as WeatherResponse;
        queueMicrotask(() => setWeather(cachedWeather));
      } catch {
        window.localStorage.removeItem(weatherCacheKey);
      }
    }

    findLocation(controller.signal)
      .then((location) => {
        const params = new URLSearchParams({
          version: "2",
          latitude: String(location.latitude),
          longitude: String(location.longitude),
          city: location.city,
          country: location.country,
        });
        return fetch(`/api/weather?${params}`, { signal: controller.signal })
          .then(async (response) => {
            if (response.ok) return response;

            const providerParams = new URLSearchParams({
              latitude: String(location.latitude),
              longitude: String(location.longitude),
              current: "temperature_2m,weather_code",
              daily: "weather_code,temperature_2m_max",
              timezone: "auto",
              forecast_days: "6",
            });
            const fallback = await fetch(
              `https://api.open-meteo.com/v1/forecast?${providerParams}`,
              { signal: controller.signal },
            );
            if (!fallback.ok) return fallback;

            const provider = (await fallback.json()) as {
              timezone: string;
              current: { temperature_2m: number; weather_code: number };
              daily: {
                time: string[];
                temperature_2m_max: number[];
                weather_code: number[];
              };
            };
            const normalized: WeatherResponse = {
              location: {
                city: location.city,
                country: location.country,
              },
              timezone: provider.timezone,
              current: {
                temperature: Math.round(provider.current.temperature_2m),
                weatherCode: provider.current.weather_code,
              },
              forecast: provider.daily.time.map((date, index) => ({
                date,
                temperatureMax: Math.round(
                  provider.daily.temperature_2m_max[index],
                ),
                weatherCode: provider.daily.weather_code[index],
              })),
            };
            return new Response(JSON.stringify(normalized), {
              headers: { "Content-Type": "application/json" },
            });
          });
      })
      .then((response) => {
        if (!response.ok) throw new Error("Weather failed");
        return response.json() as Promise<WeatherResponse>;
      })
      .then((data) => {
        setWeather(data);
        setFailed(false);
        window.localStorage.setItem(weatherCacheKey, JSON.stringify(data));
      })
      .catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          !cached
        ) {
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => {
    if (!weather) return "";
    return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: locale === "en",
      timeZone: weather.timezone,
    }).format(now);
  }, [locale, now, weather]);

  return (
    <article className={`${styles.liveCard} ${styles.weatherCard}`}>
      {failed ? (
        <p className={styles.widgetMessage}>{copy.unavailable}</p>
      ) : weather ? (
        <>
          <div className={styles.weatherMeta}>
            <time>{time}</time>
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              aria-label={copy.attribution}
            >
              Open-Meteo
            </a>
          </div>

          <p className={styles.weatherLocation}>
            <Pin size={12} />
            {weather.location.city}, {weather.location.country}
          </p>

          <div className={styles.weatherCurrent}>
            <strong>
              {weather.current.temperature}°<small>C</small>
            </strong>
            <span>
              {copy.conditions[weatherKey(weather.current.weatherCode)]}
            </span>
          </div>

          <div className={styles.weatherForecast}>
            {(weather.forecast ?? []).map((day) => (
              <div key={day.date}>
                <span>
                  {new Intl.DateTimeFormat(
                    locale === "pt" ? "pt-BR" : "en-US",
                    { weekday: "short", timeZone: "UTC" },
                  )
                    .format(new Date(`${day.date}T12:00:00Z`))
                    .replace(".", "")}
                </span>
                <strong>{day.temperatureMax}°</strong>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className={styles.widgetMessage}>{copy.loading}</p>
      )}
    </article>
  );
}
