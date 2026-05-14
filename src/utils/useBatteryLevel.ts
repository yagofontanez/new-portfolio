import { useEffect, useState } from "react";

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

export const useBatteryLevel = (fallbackLevel = 0.28) => {
  const [level, setLevel] = useState(fallbackLevel);
  const [charging, setCharging] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return;

    let battery: BatteryManager | null = null;
    let unmounted = false;

    const update = () => {
      if (!battery) return;
      setLevel(battery.level);
      setCharging(battery.charging);
    };

    nav
      .getBattery()
      .then((b) => {
        if (unmounted) return;
        battery = b;
        setSupported(true);
        update();
        b.addEventListener("levelchange", update);
        b.addEventListener("chargingchange", update);
      })
      .catch(() => {
        /* permission denied or unsupported — keep fallback */
      });

    return () => {
      unmounted = true;
      if (battery) {
        battery.removeEventListener("levelchange", update);
        battery.removeEventListener("chargingchange", update);
      }
    };
  }, []);

  return { level, charging, supported };
};
