import React, { useCallback } from "react";
import styles from "./tab-title.module.scss";

type Props = {
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  selectedTab,
  index,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li>
      <button
        onClick={onClick}
        className={[
          styles.button,
          index === selectedTab ? styles.active : "",
        ].join(" ")}
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
