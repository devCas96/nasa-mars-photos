import { useSWRConfig } from 'swr';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import { IPhoto, IPhotoList } from '@/types/types';
import { fetcher } from '@/utils/fetcher';

interface UseInfiniteLoadingProps {
  rover: string | string[],
  date: {
    earth: string
    sun: number
  }
}

const config: SWRInfiniteConfiguration = {
  revalidateOnFocus: false,
  initialSize: 1,
};

const UseInfiniteLoading = ({ rover, date }: UseInfiniteLoadingProps) => {

  const { fallbackData } = useSWRConfig();
  const withAdditionalConfig = { ...config, fallbackData: [fallbackData.photoList] };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<IPhotoList>(
    (index) =>
      `/api/photos?rover=${rover}&date=${date.earth}&dateType=earth_date&page=${index + 1
      }`,
    fetcher<IPhotoList>,
    withAdditionalConfig
  );
  const photos: IPhoto[] = data
    ? [...data.map((list) => list.photos)].flat()
    : [];

  const isEmpty = photos.length === 0;
  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.photos.length < 25);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    data: photos,
    isEmpty,
    isLoadingInitialData,
    isReachingEnd,
    size,
    setSize,
    isLoading,
    isLoadingMore,
    isRefreshing
  };
};

export default UseInfiniteLoading;