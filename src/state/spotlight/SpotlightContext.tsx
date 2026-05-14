import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface SpotlightApi {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SpotlightContext = createContext<SpotlightApi | null>(null);

export const SpotlightProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <SpotlightContext.Provider value={value}>{children}</SpotlightContext.Provider>
  );
};

export const useSpotlight = (): SpotlightApi => {
  const ctx = useContext(SpotlightContext);
  if (!ctx) throw new Error("useSpotlight must be used inside <SpotlightProvider>");
  return ctx;
};
