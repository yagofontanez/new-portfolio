import { FaSearch } from "react-icons/fa";
import "./../../styles/mobile/IPhoneSearchBar.css";

const IPhoneSearchBar = () => {
  return (
    <div className="iphone-search-bar">
      <FaSearch className="iphone-search-icon" />
      <span className="iphone-search-text">Buscar</span>
    </div>
  );
};

export default IPhoneSearchBar;
