import "./../../styles/mobile/iPhoneAppIcon.css";

interface IPhoneAppIconProps {
  label: string;
  icon?: React.ReactNode;
  image?: string;
  onClick: () => void;
  color?: string;
}

const IPhoneAppIcon: React.FC<IPhoneAppIconProps> = ({
  label,
  icon,
  image,
  onClick,
  color = "#007AFF",
}) => {
  return (
    <div className="iphone-app-icon" onClick={onClick}>
      <div
        className="iphone-app-icon-inner"
        style={{
          backgroundColor: image ? "transparent" : color,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: image ? "cover" : undefined,
        }}
      >
        {!image && icon}
      </div>
      <span className="iphone-app-icon-label">{label}</span>
    </div>
  );
};

export default IPhoneAppIcon;
