import withLayout from '@/components/_hoc/with-layout';
import Loader from '@/components/atoms/loader/loader';
import ErrorComponent from '@/components/organisms/section-error/section-error';
import Layout from '@/components/templates/page-layout/layout';
import { DateTypes, Rovers } from '@/constants/dummy';
import { BASE_APP_URL } from '@/constants/global';
import { IPhotoList } from '@/types/types';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import { GetStaticProps } from 'next';

interface Props {
  photoList?: IPhotoList;
}

const Rover = ({ photoList }: Props) => {
  const WrappedErrorComponent = withLayout(ErrorComponent);
  const WrappedLoaderComponent = withLayout(Loader);
  if (!photoList) {
    return <WrappedLoaderComponent />;
  }

  if (photoList.photos.length === 0) {
    return <WrappedErrorComponent message='Ups! No results found with those search params.' />;
  }

  return (
    <Layout>
      <h1>Fetched!</h1>
    </Layout>
  );
};

export async function getStaticPaths() {

  const paths = Object.values(Rovers).map((slug) => {
    const lowerRover = slug.toLowerCase();

    return {
      params: { slug: lowerRover },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {

  // Initial Data by Rover with Earth date and current date
  const { rover, page, dateType, date } = {
    rover: context.params?.slug,
    page: '1',
    dateType: DateTypes.EARTH,
    date: formatDate(getCurrentDate()),
  };

  const endpoint = `${BASE_APP_URL}api/photos?rover=${rover}&page=${page}&dateType=${dateType}&date=${date}`;
  const response = await fetch(endpoint);
  const photoList: IPhotoList = await response.json();

  return {
    props: {
      photoList,
    },
  };
};

export default Rover;
