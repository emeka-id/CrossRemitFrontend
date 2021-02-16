import React, { useCallback } from 'react';
import styles from './tab-title.module.scss';

type Props = {
  title: string
  index: number
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index }) => {

  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <li>
      <button onClick={onClick} className={styles.button}>{title}</button>
    </li>
  )
}

export default TabTitle;