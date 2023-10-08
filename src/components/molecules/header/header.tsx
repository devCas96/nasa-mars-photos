import { ReactNode, type FC } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

interface HeaderProps {
  children: ReactNode;
}

interface HeaderNavigationProps {
  items: [] | string[];
}

const buildRoverUrl = (roverKey: string): string =>
  `/rover/${roverKey.toLowerCase()}`;

const Header: FC<HeaderProps> & { Navigation: FC<HeaderNavigationProps> } = ({
  children,
}) => (
  <header className={styles.header}>
    <Link href='/' className={styles.header__logo}>
      <p className={styles.header__title}>MARS ROVERS</p>
    </Link>
    {children}
  </header>
);

const HeaderNavigation: FC<HeaderNavigationProps> = ({ items }) => (
  <nav className={styles.header__nav}>
    <ul className={styles.header__list}>
      {items.map((key, index) => (
        <li key={index} className={styles.header__item}>
          <Link href={buildRoverUrl(key)} className={styles.header__link}>
            {key}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

Header.Navigation = HeaderNavigation;

export default Header;
