'use client';

import React, { type FC, type ReactNode } from 'react';
import Header from '@/components/molecules/header/header';
import Stars from '@/components/molecules/stars/stars';
import { Rovers } from '@/constants/dummy';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <>
    <Stars />
    <Header>
      <Header.Navigation items={Object.keys(Rovers)} />
    </Header>
    <main>{children}</main>
  </>
);

export default Layout;
