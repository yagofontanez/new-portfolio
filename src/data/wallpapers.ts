import sonomaUrl from "../assets/background-portfolio.jpg";

export interface Wallpaper {
  id: string;
  label: string;
  background: string;
  preview: string;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "sonoma",
    label: "Padrão",
    background: `url("${sonomaUrl}") center/cover no-repeat fixed`,
    preview: `url("${sonomaUrl}") center/cover no-repeat`,
  },
  {
    id: "nightfall",
    label: "Nightfall",
    background:
      "radial-gradient(ellipse 80% 60% at 20% 10%, #4f2a8b 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 80% 90%, #1b3aa1 0%, transparent 65%), linear-gradient(135deg, #050a1f 0%, #0b0d2e 60%, #1a1240 100%)",
    preview:
      "radial-gradient(ellipse at 30% 30%, #4f2a8b 0%, transparent 60%), linear-gradient(135deg, #050a1f, #1a1240)",
  },
  {
    id: "sunset",
    label: "Sunset",
    background:
      "radial-gradient(ellipse 80% 60% at 30% 10%, #ffb86b 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 100%, #cc2a6e 0%, transparent 60%), linear-gradient(160deg, #ff8a3d 0%, #d63384 50%, #4b1a55 100%)",
    preview:
      "radial-gradient(ellipse at 30% 30%, #ffb86b 0%, transparent 55%), linear-gradient(160deg, #ff8a3d, #4b1a55)",
  },
  {
    id: "aurora",
    label: "Aurora",
    background:
      "radial-gradient(ellipse 100% 70% at 50% -10%, #4ade80 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 100%, #38bdf8 0%, transparent 60%), linear-gradient(180deg, #0a3a3d 0%, #0a1a3a 60%, #0a0a1a 100%)",
    preview:
      "radial-gradient(ellipse at 30% 20%, #4ade80 0%, transparent 55%), linear-gradient(180deg, #0a3a3d, #0a0a1a)",
  },
  {
    id: "mono",
    label: "Mono",
    background:
      "radial-gradient(ellipse 80% 50% at 30% 20%, #3a3a3e 0%, transparent 60%), linear-gradient(180deg, #1a1a1c 0%, #0a0a0c 100%)",
    preview:
      "radial-gradient(ellipse at 30% 30%, #3a3a3e 0%, transparent 60%), linear-gradient(180deg, #1a1a1c, #0a0a0c)",
  },
];

export const DEFAULT_WALLPAPER_ID = "sonoma";
export const findWallpaper = (id: string): Wallpaper =>
  WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
