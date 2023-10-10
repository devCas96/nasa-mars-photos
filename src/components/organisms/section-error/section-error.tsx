import RoverCartoon from '../../../../public/images/rover-cartoon.webp';
import Image from 'next/image';
import styles from './section-error.module.css';

interface Props {
  message: string
}

const ErrorComponent = ({ message }: Props) => {
  return (
    <section className={styles.sectionError}>
      <Image src={RoverCartoon} alt='rover not results found.' sizes="60vw"
        style={{
          width: '60%',
          height: 'auto',
        }}
      />
      <p className={styles.sectionError__message}>{message}</p>
    </section>);
};

export default ErrorComponent;