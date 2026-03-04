import "./../../styles/mobile/iPhoneFrame.css";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="iphone-frame">
      <div className="iphone-notch" />
      <div className="iphone-screen">{children}</div>
    </div>
  );
};

export default IPhoneFrame;
