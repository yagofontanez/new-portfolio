import "./../../styles/mobile/IPhoneAppTile.css";

interface IPhoneAppTileProps {
  label: string;
  icon: React.ReactNode;
  bg: string;
  onClick: () => void;
}

const IPhoneAppTile: React.FC<IPhoneAppTileProps> = ({
  label,
  icon,
  bg,
  onClick,
}) => {
  return (
    <button className="iphone-app-tile" onClick={onClick} aria-label={label}>
      <span className="iphone-app-tile-icon" style={{ background: bg }}>
        {icon}
      </span>
      <span className="iphone-app-tile-label">{label}</span>
    </button>
  );
};

export default IPhoneAppTile;
