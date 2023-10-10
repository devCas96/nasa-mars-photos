import { IPhotoList } from '@/types/types';
import { getPlaiceholder } from 'plaiceholder';

export const getBase64 = async (src: string) => {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64 as string;
  } catch (err) {
    return `An error has occurred: ${err}`;
  }
};

export const photoListToBase64 = async (
  list: IPhotoList
): Promise<IPhotoList> => {
  const withBase64Img = await Promise.all(
    list.photos.map(async (photo) => {
      const base64 = await getBase64(photo.img_src);
      return { ...photo, base64 };
    })
  );

  return { ...list, photos: withBase64Img };
};
