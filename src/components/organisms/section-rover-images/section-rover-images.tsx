'use client';

import { SyntheticEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import useInfiniteLoading from '@/hooks/useInfiniteLoader';
import { Rovers } from '@/constants/dummy';
import useDebounce from '@/hooks/useDebounce';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import RoverImagesResult from '@/components/molecules/rover-images-result/rover-images-result';
import RoverImagesSearch from '@/components/molecules/rover-images-search/rover-images-search';
import styles from './section-rover-images.module.css';

interface IDateState {
  earth: string;
  sun: string;
}

const SectionRoverImages = () => {
  const router = useRouter();
  const { slug } = router.query;
  const rover = slug || Rovers.CURIOSITY.toLowerCase();
  const [isSunTime, setDateType] = useState<boolean>(false);
  const [camera, setCamera] = useState<string>('');
  const [date, setDate] = useState<IDateState>({
    earth: formatDate(getCurrentDate()),
    sun: '',
  });

  const debouncedDateValue = useDebounce(date, 500);
  const { data: photos,
    isReachingEnd,
    size,
    setSize,
    isLoadingInitialData,
    isEmpty,
    isLoading,
    isLoadingMore,
    error
  } = useInfiniteLoading({ rover, date: debouncedDateValue, isSunTime, camera });

  const handleSetNewDate = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    const $dateInput = e.target as HTMLInputElement;
    const condionallyUpdate = { ...date, [`${isSunTime ? 'sun' : 'earth'}`]: $dateInput.value! };

    setDate(condionallyUpdate);
  }, [date, isSunTime]);

  const handleSetNewCamera = useCallback((e: SyntheticEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const $select = e.target as HTMLSelectElement;

    setCamera($select.value!);
  }, []);

  const handleLoadMore = () => setSize(size + 1);

  return (
    <section className={styles['section-images']}>

      <RoverImagesSearch
        toggleState={{
          value: isSunTime,
          handleClick: () => {
            setDateType(!isSunTime);
          },
        }}
        dateInputState={{ value: date.earth, setter: handleSetNewDate }}
        sunInputState={{ value: date.sun, setter: handleSetNewDate }}
        cameraState={{ value: camera, setter: handleSetNewCamera }} />

      <RoverImagesResult isLoadingInitialData={isLoadingInitialData} isLoading={isLoading} isEmpty={isEmpty} data={photos} error={error}>
        {!isEmpty && <RoverImagesResult.LoadMoreButton onClick={handleLoadMore} isReachingEnd={isReachingEnd} isLoadingMore={isLoadingMore} classes={styles['section-images__button']} />}
      </RoverImagesResult>

    </section>
  );
};

export default SectionRoverImages;
