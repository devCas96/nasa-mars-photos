import { ComponentType, FC } from 'react';
import Layout from '@/components/templates/page-layout/layout';


const withLayout = <P extends object>(Component: ComponentType<P>) => {
  const WithLayout: FC<P> = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return WithLayout;
};

export default withLayout;
