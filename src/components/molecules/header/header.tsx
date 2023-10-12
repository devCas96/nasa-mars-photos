import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import { useRouter } from 'next/router';
interface HeaderProps {
  children: ReactNode;
}
interface HeaderNavigationProps {
  items: string[];
}

const headerTitle = 'MARS ROVERS';
const buildRoverUrl = (roverName: string): string =>
  `/rover/${roverName}`;

const Header = ({ children }: HeaderProps) => (
  <header className={styles.header}>
    <Link href="/" className={styles.header__logo}>
      <p className={styles.header__title}>{headerTitle}</p>
    </Link>
    {children}
  </header>
);

const HeaderNavigation = ({ items }: HeaderNavigationProps) => {

  const router = useRouter();
  const currentActivePage = router.query?.slug;

  return (
    <nav className={styles.header__nav}>
      <ul className={styles.header__list}>
        {items.map((rover, index) => {
          const roverLowerCase = rover.toLowerCase();

          return (
            <li key={index} className={`${styles.header__item} ${currentActivePage === roverLowerCase ? styles['header__item--active'] : ''}`}>
              <Link href={buildRoverUrl(roverLowerCase)} className={styles.header__link}>
                {rover}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Header.Navigation = HeaderNavigation;

export default Header;
