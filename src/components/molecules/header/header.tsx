import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
interface HeaderProps {
  children: ReactNode;
}
interface HeaderNavigationProps {
  items: string[];
}

const buildRoverUrl = (roverName: string): string =>
  `/rover/${roverName.toLowerCase()}`;

const Header = ({ children }: HeaderProps) => (
  <header className={styles.header}>
    <Link href="/" className={styles.header__logo}>
      <p className={styles.header__title}>MARS ROVERS</p>
    </Link>
    {children}
  </header>
);

const HeaderNavigation = ({ items }: HeaderNavigationProps) => (
  <nav className={styles.header__nav}>
    <ul className={styles.header__list}>
      {items.map((rover, index) => (
        <li key={index} className={styles.header__item}>
          <Link href={buildRoverUrl(rover)} className={styles.header__link}>
            {rover}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

Header.Navigation = HeaderNavigation;

export default Header;
