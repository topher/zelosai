// lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import languages from "public/preset_data/languages.json"
import countries from "public/preset_data/countries.json"
import sports from "public/preset_data/sports.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// Language Mapping
export interface Language {
  code: string
  name: string
  native: string
  rtl?: boolean
}

export const languageMap: Record<string, string> = languages.reduce((acc: Record<string, string>, lang: Language) => {
  acc[lang.code] = lang.name
  return acc
}, {})

// Country Mapping
export interface CountryInfo {
  name: string
  emoji: string
}

export const countryMap: Record<string, CountryInfo> = countries

// Sport Mapping
export interface Sport {
  Code: string
  Id: string
  NonSport: string
  SportCode: string
  EventOrder: string
  Scheduled: string
  IF: string
  ENG_Description: string
  FRA_Description: string
}

export const sportsMap: Record<string, string> = sports.reduce(
  (acc: Record<string, string>, sport: Sport) => {
    acc[sport.Id] = sport.ENG_Description
    return acc
  },
  {}
)