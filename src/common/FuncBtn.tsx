import { VscChevronDown } from "react-icons/vsc";
import styles from "./funcbtn.module.css";
import { useState } from "react";

type FuncBtnProps = {
  settings: Record<string, any> | null;
};

export default function FuncBtn({ settings }: FuncBtnProps) {
  const [open, setOpen] = useState(false);
  if (settings === null) return null;

  return (
    <div className={styles.container}>
      <button className={styles["open-btn"]} onClick={() => setOpen(!open)}>
        <span>{settings.function}</span>
        <VscChevronDown />
      </button>
      <div className={`${styles.options} ${open ? styles.open : ""}`}>
        <p>Unit</p>
        <div>
          <div>
            <button>None</button>
            <button>$</button>
            <button>€</button>
            <button>£</button>
            <button>%</button>
            <input type="text" placeholder="Type your own" />
          </div>
          <div>
            <button>L</button>
            <button>R</button>
          </div>
        </div>
        <p>Function</p>
        <div>
          <button>Sum</button>
          <button>Average</button>
          <button>Median</button>
          <button>Min</button>
          <button>Max</button>
          <button>Count</button>
        </div>
      </div>
    </div>
  );
}
