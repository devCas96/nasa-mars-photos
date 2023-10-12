import styles from './toggle.module.css';

interface Props {
  state: {
    value: boolean;
    handleClick: () => void;
  };
}

const Toggle = ({ state }: Props) => {
  const { value, handleClick } = state;
  return (
    <button
      className={`${styles.toggle} ${value ? styles['toggle--active'] : ''}`}
      onClick={handleClick}
    >
      <span className={styles['toggle-button']}>
      </span>
      <span className={`${styles.star} ${styles['star-1']}`}></span>
      <span className={`${styles.star} ${styles['star-2']}`}></span>
      <span className={`${styles.star} ${styles['star-3']}`}></span>
      <span className={`${styles.star} ${styles['star-4']}`}></span>
      <span className={`${styles.star} ${styles['star-5']}`}></span>
      <span className={`${styles.star} ${styles['star-6']}`}></span>
      <span className={`${styles.star} ${styles['star-7']}`}></span>
      <span className={`${styles.star} ${styles['star-8']}`}></span>
    </button>
  );
};

export default Toggle;
