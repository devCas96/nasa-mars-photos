import RoverCartoon from '../../../../public/images/rover-cartoon.webp';
import Image from 'next/image';
import styles from './section-error.module.css';

interface Props {
  message: string
}

const ErrorComponent = ({ message }: Props) => {
  return (
    <section className={styles.sectionError}>
      <Image src={RoverCartoon} alt='Rover error.'
        style={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
        }}
        priority
      />
      <p className={styles.sectionError__message}>{message}</p>
    </section>);
};

export default ErrorComponent;