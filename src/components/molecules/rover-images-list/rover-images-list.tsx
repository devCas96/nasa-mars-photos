import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import { IPhoto } from '@/types/types';
import styles from './rover-images-list.module.css';

interface RoverImagesListProps {
  children: ReactNode;
}

interface RoverImageListItemProps {
  photo: IPhoto;
}

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const RoverImagesList = React.memo(({ children }: RoverImagesListProps) => {
  return (
    <ul className={styles['rover-images__list']}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) &&
          ((child.type as FC<HTMLElement>).displayName === 'RoverImageListItem' || (child.type as FC<HTMLElement>).name === 'SkeletonList')) {
          return child;
        }
        return null;
      })}
    </ul>
  );
});

const RoverImageListItem: React.FC<RoverImageListItemProps> = ({ photo }: RoverImageListItemProps) => {
  return (
    <li className={styles['rover-images__item']}>
      <Image
        className={styles['rover-images__image']}
        loader={customLoader}
        unoptimized
        src={photo.img_src}
        alt={`Camera ${photo.camera.full_name}`}
        width={300}
        height={300}
        quality={90}
        placeholder='blur'
        blurDataURL={photo.base64}
      />
    </li>
  );
};

RoverImagesList.displayName = 'RoverImagesList';
RoverImageListItem.displayName = 'RoverImageListItem';

export { RoverImagesList, RoverImageListItem };
