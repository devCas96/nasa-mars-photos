import Layout from '@/components/templates/page-layout/layout';
import { GetServerSideProps } from 'next';

interface Props {
  slug: string;
}

const Rover = ({ slug }: Props) => {
  return (
    <Layout>
      <h2>Rover {slug}</h2>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      slug: context.params?.slug,
    },
  };
};

export default Rover;
