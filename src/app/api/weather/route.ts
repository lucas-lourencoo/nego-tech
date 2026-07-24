import { NextResponse } from "next/server";
import type { WeatherResponse } from "@/components/Portfolio/live-widgets/types";

const CACHE_SECONDS = 60 * 30;

type OpenMeteoResponse = {
  timezone?: string;
  current?: {
    temperature_2m?: number;
    weather_code?: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    weather_code?: number[];
  };
};

function parseCoordinate(value: string | null, min: number, max: number) {
  if (value === null || value.trim() === "") return null;
  const coordinate = Number(value);
  return Number.isFinite(coordinate) && coordinate >= min && coordinate <= max
    ? coordinate
    : null;
}

function cleanLocation(value: string | null, fallback: string) {
  const cleaned = value?.trim().slice(0, 80);
  return cleaned || fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = parseCoordinate(searchParams.get("latitude"), -90, 90);
  const longitude = parseCoordinate(searchParams.get("longitude"), -180, 180);

  if (latitude === null || longitude === null) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude." },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max",
    timezone: "auto",
    forecast_days: "6",
  });

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { next: { revalidate: CACHE_SECONDS } },
    );

    if (!response.ok) {
      throw new Error(`Weather returned ${response.status}`);
    }

    const provider = (await response.json()) as OpenMeteoResponse;
    const times = provider.daily?.time ?? [];
    const maximums = provider.daily?.temperature_2m_max ?? [];
    const codes = provider.daily?.weather_code ?? [];

    if (
      typeof provider.current?.temperature_2m !== "number" ||
      typeof provider.current.weather_code !== "number" ||
      typeof provider.timezone !== "string" ||
      !times.length ||
      times.length !== maximums.length ||
      times.length !== codes.length ||
      !maximums.every(Number.isFinite) ||
      !codes.every(Number.isFinite)
    ) {
      throw new Error("Weather payload is incomplete");
    }

    const payload: WeatherResponse = {
      location: {
        city: cleanLocation(searchParams.get("city"), "Campo Grande"),
        country: cleanLocation(searchParams.get("country"), "Brazil"),
      },
      timezone: provider.timezone,
      current: {
        temperature: Math.round(provider.current.temperature_2m),
        weatherCode: provider.current.weather_code,
      },
      forecast: times.map((date, index) => ({
        date,
        temperatureMax: Math.round(maximums[index]),
        weatherCode: codes[index],
      })),
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=3600`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Weather is temporarily unavailable." },
      { status: 502 },
    );
  }
}
