import { GetStaticProps } from 'next';
import { SWRConfig } from 'swr';
import { DateTypes, Rovers } from '@/constants/dummy';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import { API_KEY, BASE_URL } from '@/constants/global';
import { IPhotoList } from '@/types/types';
import SectionRoverImages from '@/components/organisms/section-rover-images/section-rover-images';
import withLayout from '@/components/_hoc/with-layout';
import { photoListToBase64 } from '@/utils/get-base64';

interface Props {
  fallbackData: {
    photoList: IPhotoList;
  };
}

const Rover = ({ fallbackData }: Props) => {

  const SWRConfigComponent = () => {
    return (<SWRConfig value={{ fallbackData: fallbackData }}>
      <SectionRoverImages />
    </SWRConfig>);
  };

  const WrappedSWRConfig = withLayout(SWRConfigComponent);

  return (
    <WrappedSWRConfig />
  );
};

export async function getStaticPaths() {

  const paths = Object.values(Rovers).map((slug) => {
    const lowerCaseRoverSlug = slug.toLowerCase();
    return {
      params: { slug: lowerCaseRoverSlug },
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

  const endpoint = `${BASE_URL}${rover}/photos?page=${page}&${dateType}=${date}&api_key=${API_KEY}`;
  const response = await fetch(endpoint);
  const photoList: IPhotoList = await response.json();
  const withBase64 = await photoListToBase64(photoList);
  return {
    props: {
      fallbackData: {
        photoList: withBase64,
      },
    },
  };
};

export default Rover;
