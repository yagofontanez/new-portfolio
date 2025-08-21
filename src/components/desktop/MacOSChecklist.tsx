import { useState } from "react";
import "./../../styles/desktop/MacOSChecklist.css";

interface MacOSChecklistProps {
  items: string[];
}

const MacOSChecklist: React.FC<MacOSChecklistProps> = ({ items }) => {
  const [checked, setChecked] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  const toggleItem = (index: number) => {
    setChecked((prev) => prev.map((c, i) => (i === index ? !c : c)));
  };

  return (
    <ul className="macos-checklist">
      {items.map((item, index) => (
        <li
          key={index}
          className={`macos-checklist-item ${checked[index] ? "checked" : ""}`}
          onClick={() => toggleItem(index)}
        >
          <span className="macos-checklist-circle">
            {checked[index] && "✓"}
          </span>
          <span className="macos-checklist-text">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default MacOSChecklist;
