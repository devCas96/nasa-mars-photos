'use client';

import { FC, SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';
import UseInfiniteLoading from '@/hooks/useInfiniteLoader/useInfiniteLoader';
import { formatDate, getCurrentDate } from '@/utils/date-handler';
import { PHOTOS_PER_PAGE } from '@/constants/global';
import Loader from '@/components/atoms/loader/loader';
import { RoverImageListItem, RoverImagesList } from '@/components/molecules/rover-images-list/rover-images-list';
import SkeletonList from '@/components/molecules/skeleton-list/skeleton-list';
import ErrorComponent from '@/components/organisms/section-error/section-error';
import Toggle from '@/components/atoms/toggle/toggle';
import styles from './section-rover-images.module.css';

interface IDateState {
  earth: string;
  sun: number;
}

const SectionRoverImages: FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const rover = slug || 'curiosity';
  const [isSunTime, setDateType] = useState<boolean>(false);
  const [date, setDate] = useState<IDateState>({
    earth: formatDate(getCurrentDate()),
    sun: 0,
  });

  const { data: photos,
    isReachingEnd,
    size,
    setSize,
    isLoadingInitialData,
    isEmpty,
    isLoadingMore
  } = UseInfiniteLoading({ rover, date });

  const setNewDate = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    const $dateInput = e.target as HTMLInputElement;
    setDate({ ...date, earth: $dateInput.value! });
  };

  const handleLoadMore = () => setSize(size + 1);

  return (
    <section className={styles['section-images']}>
      <Toggle
        state={{
          value: isSunTime,
          handleClick: () => {
            setDateType(!isSunTime);
          },
        }}
      />
      {!isSunTime ? (
        <input
          className={styles['section-images__input']}
          value={date.earth}
          type='date'
          name='dateearth'
          onChange={setNewDate}
        />
      ) : (
        <input
          className={styles['section-images__input']}
          defaultValue={date.sun}
          type='number'
          name='datesun'
        />
      )}
      {isEmpty ? <ErrorComponent message='Ups! No results found with those search params.' /> :
        <>
          <RoverImagesList>
            {
              isLoadingInitialData ? <SkeletonList amount={PHOTOS_PER_PAGE} width={300} height={300} /> :
                photos.map((photo) => (
                  <RoverImageListItem photo={photo} key={photo.id} />
                ))
            }
          </RoverImagesList>

          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={handleLoadMore}
            className={styles['section-images__button']}
            style={{
              pointerEvents: (isLoadingMore || isReachingEnd) ? 'none' : 'all'
            }}
          >
            {isLoadingMore
              ? <Loader />
              : isReachingEnd
                ? 'Congratulations, you reached the end.'
                : 'Load more'}
          </button>
        </>
      }
    </section>
  );
};

export default SectionRoverImages;
