import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = (
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) => {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    const getFocusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const focusFirst = () => {
      const items = getFocusables();
      (items[0] ?? container).focus({ preventScroll: true });
    };

    focusFirst();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (activeEl === first || !container.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKey);

    return () => {
      container.removeEventListener("keydown", onKey);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [active, ref]);
};
