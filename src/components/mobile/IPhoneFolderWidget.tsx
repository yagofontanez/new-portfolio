import "./../../styles/mobile/IPhoneFolderWidget.css";

interface IPhoneFolderWidgetProps {
  label: string;
  badge?: number;
  icons: React.ReactNode[];
  onClick: () => void;
}

const IPhoneFolderWidget: React.FC<IPhoneFolderWidgetProps> = ({
  label,
  badge,
  icons,
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
          {icons.slice(0, 4).map((icon, i) => (
            <div key={i} className="iphone-folder-icon">
              {icon}
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
