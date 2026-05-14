import { useCallback } from "react";
import { usePreferences } from "../state/preferences/PreferencesContext";
import { playClick, playPop, playClose } from "./sounds";

export const useSounds = () => {
  const { soundsEnabled } = usePreferences();
  const click = useCallback(() => {
    if (soundsEnabled) playClick();
  }, [soundsEnabled]);
  const pop = useCallback(() => {
    if (soundsEnabled) playPop();
  }, [soundsEnabled]);
  const close = useCallback(() => {
    if (soundsEnabled) playClose();
  }, [soundsEnabled]);
  return { click, pop, close };
};
