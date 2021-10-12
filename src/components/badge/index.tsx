import React from "react";
import { ReactChild } from "react";
import styles from "./badge.module.scss";

interface BadgeProps {
  type: string;
  children: ReactChild;
  className?: string;
}

const Badge = ({ type, children, className }: BadgeProps) => {
  return (
    <div className={styles.badge} data-type={type}>
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export default Badge;
