import "./../../styles/mobile/IPhonePageDots.css";

interface IPhonePageDotsProps {
  total: number;
  active: number;
}

const IPhonePageDots: React.FC<IPhonePageDotsProps> = ({ total, active }) => {
  return (
    <div className="iphone-page-dots">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`iphone-page-dot${i === active ? " active" : ""}`}
        />
      ))}
    </div>
  );
};

export default IPhonePageDots;
