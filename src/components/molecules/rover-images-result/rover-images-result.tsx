import ErrorComponent from '@/components/organisms/section-error/section-error';
import { RoverImageListItem, RoverImagesList } from '../rover-images-list/rover-images-list';
import SkeletonList from '../skeleton-list/skeleton-list';
import { PHOTOS_PER_PAGE } from '@/constants/global';
import { FrontErrors } from '@/constants/errors';
import { ReactNode } from 'react';
import { IPhoto } from '@/types/types';
import Loader from '@/components/atoms/loader/loader';

interface ResultProps {
  children: ReactNode;
  isLoadingInitialData: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  data: IPhoto[];
  error: string
}
interface LoadMoreProps {
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
  classes: string;
  onClick: () => void;
}

const RoverImagesResult = ({ isLoadingInitialData, isLoading, isEmpty, data: photos, children, error }: ResultProps) => {

  if (isLoadingInitialData || isLoading) {
    return <RoverImagesList><SkeletonList amount={PHOTOS_PER_PAGE} width={300} height={300} /></RoverImagesList>;
  }

  if (isEmpty) {
    return <ErrorComponent message={FrontErrors.EMPTY_RESULT} />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <>
      <RoverImagesList>
        {photos.map((photo) => (
          <RoverImageListItem photo={photo} key={photo.id} />
        ))
        }
      </RoverImagesList>
      {children}
    </>
  );
};

const LoadMoreButton = ({ onClick, isLoadingMore, isReachingEnd, classes }: LoadMoreProps) => (
  <button
    disabled={isLoadingMore || isReachingEnd}
    onClick={onClick}
    className={classes}
    style={{
      pointerEvents: isLoadingMore || isReachingEnd ? 'none' : 'all'
    }}
  >
    {isLoadingMore
      ? <Loader />
      : isReachingEnd
        ? 'Congratulations, you reached the end.'
        : 'Load more'}
  </button>
);

RoverImagesResult.LoadMoreButton = LoadMoreButton;

export default RoverImagesResult;