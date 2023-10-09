import Layout from '@/components/templates/page-layout/layout';
import { DateTypes } from '@/constants/dummy';
import { BASE_APP_URL } from '@/constants/global';
import { IPhotoList } from '@/types/types';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import { GetServerSideProps } from 'next';

const Rover = () => {
  return (
    <Layout>
      <h1>Rover</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

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
