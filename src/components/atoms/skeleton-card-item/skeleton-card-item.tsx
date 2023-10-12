import styles from './skeleton-card-item.module.css';

interface Props {
  width: number;
  height: number;
}

const SkeletonCardItem = ({ width, height }: Props) =>
  <li
    style={{ width, height }}
    className={styles.skeleton}
  />;

export default SkeletonCardItem;
