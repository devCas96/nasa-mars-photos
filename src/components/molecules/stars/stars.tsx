import { type FC } from 'react';
import styles from './stars.module.css';

const Stars: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.stars}></div>
    <div className={styles.stars2}></div>
    <div className={styles.stars3}></div>
    <div className={styles.stars4}></div>
  </div>
);

export default Stars;
