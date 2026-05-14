import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_WALLPAPER_ID, findWallpaper } from "../../data/wallpapers";

export type ThemeMode = "light" | "dark";

interface PreferencesApi {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  wallpaperId: string;
  setWallpaperId: (id: string) => void;
  soundsEnabled: boolean;
  setSoundsEnabled: (v: boolean) => void;
}

const STORAGE_KEY = "yfp:preferences:v1";

const PreferencesContext = createContext<PreferencesApi | null>(null);

const readStored = (): Partial<{
  theme: ThemeMode;
  wallpaperId: string;
  soundsEnabled: boolean;
}> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeStored = (data: object) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota / private mode */
  }
};

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const initial = useMemo(readStored, []);
  const [theme, setThemeState] = useState<ThemeMode>(initial.theme ?? "light");
  const [wallpaperId, setWallpaperIdState] = useState<string>(
    initial.wallpaperId ?? DEFAULT_WALLPAPER_ID,
  );
  const [soundsEnabled, setSoundsEnabledState] = useState<boolean>(
    initial.soundsEnabled ?? true,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const wp = findWallpaper(wallpaperId);
    document.documentElement.style.setProperty("--wallpaper-bg", wp.background);
  }, [wallpaperId]);

  useEffect(() => {
    writeStored({ theme, wallpaperId, soundsEnabled });
  }, [theme, wallpaperId, soundsEnabled]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const setWallpaperId = useCallback(
    (id: string) => setWallpaperIdState(id),
    [],
  );
  const setSoundsEnabled = useCallback(
    (v: boolean) => setSoundsEnabledState(v),
    [],
  );

  const value = useMemo<PreferencesApi>(
    () => ({ theme, setTheme, wallpaperId, setWallpaperId, soundsEnabled, setSoundsEnabled }),
    [theme, setTheme, wallpaperId, setWallpaperId, soundsEnabled, setSoundsEnabled],
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesApi => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return ctx;
};
