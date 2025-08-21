declare module "react-chrono" {
  import * as React from "react";

  export interface ChronoItem {
    title: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardDetailedText?: string;
    media?: {
      type: "image" | "video";
      source: { url: string };
    };
  }

  export interface ChronoProps {
    items: ChronoItem[];
    mode?: "HORIZONTAL" | "VERTICAL" | "VERTICAL_ALTERNATING";
    slideShow?: boolean;
    itemWidth?: number;
    cardHeight?: number;
    hideControls?: boolean;
    theme?: {
      primary?: string;
      secondary?: string;
      cardBgColor?: string;
      cardForeColor?: string;
      titleColor?: string;
    };
    children?: React.ReactNode;
  }

  export class Chrono extends React.Component<ChronoProps> {}
}
