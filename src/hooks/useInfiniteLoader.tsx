import { useSWRConfig } from 'swr';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import { IPhoto, IPhotoList } from '@/types/types';
import { fetcher } from '@/utils/fetcher';
import { DateTypes } from '@/constants/dummy';

interface Props {
  rover: string | string[],
  isSunTime: boolean,
  date: {
    earth: string
    sun: string
  },
  camera: string
}

const config: SWRInfiniteConfiguration = {
  revalidateOnFocus: false,
  initialSize: 1,
};

const useInfiniteLoading = ({ rover, date, isSunTime, camera }: Props) => {

  const { fallbackData } = useSWRConfig();
  const withAdditionalConfig = { ...config, fallbackData: [fallbackData.photoList] };

  const dateParam = isSunTime ? date.sun : date.earth;
  const dateTypeParam = isSunTime ? DateTypes.SUN : DateTypes.EARTH;
  const optionalCameraParam = camera === '' ? '' : `&camera=${camera}`;

  const shouldFetch = (): boolean => rover !== '' && (isSunTime ? date.sun !== '' : date.earth !== '');

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<IPhotoList>(
    (index) =>
      shouldFetch() ?
        `/api/photos?rover=${rover}&date=${dateParam}&dateType=${dateTypeParam}${optionalCameraParam}&page=${index + 1}`
        : null,
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
    isRefreshing,
    error
  };
};

export default useInfiniteLoading;