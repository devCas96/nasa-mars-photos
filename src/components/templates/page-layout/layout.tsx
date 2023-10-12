'use client';

import { type ReactNode } from 'react';
import Header from '@/components/molecules/header/header';
import Stars from '@/components/molecules/stars/stars';
import { Rovers } from '@/constants/dummy';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Stars />
    <Header>
      <Header.Navigation items={Object.values(Rovers)} />
    </Header>
    <main>{children}</main>
  </>
);

export default Layout;
