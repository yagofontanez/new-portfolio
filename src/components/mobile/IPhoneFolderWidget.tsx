import "./../../styles/mobile/IPhoneFolderWidget.css";

export interface FolderTile {
  icon: React.ReactNode;
  bg?: string;
  color?: string;
}

interface IPhoneFolderWidgetProps {
  label: string;
  badge?: number;
  tiles: FolderTile[];
  onClick: () => void;
}

const IPhoneFolderWidget: React.FC<IPhoneFolderWidgetProps> = ({
  label,
  badge,
  tiles,
  onClick,
}) => {
  const formatBadge = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",") + "k";
    return n.toString();
  };

  return (
    <div className="iphone-folder-widget" onClick={onClick}>
      <div className="iphone-folder-widget-inner">
        <div className="iphone-folder-icons">
          {tiles.slice(0, 4).map((tile, i) => (
            <div
              key={i}
              className="iphone-folder-icon"
              style={{
                background: tile.bg ?? "rgba(255,255,255,0.12)",
                color: tile.color ?? "#fff",
              }}
            >
              {tile.icon}
            </div>
          ))}
        </div>
        {badge !== undefined && badge > 0 && (
          <span className="iphone-folder-badge">{formatBadge(badge)}</span>
        )}
      </div>
      <span className="iphone-folder-label">{label}</span>
    </div>
  );
};

export default IPhoneFolderWidget;
