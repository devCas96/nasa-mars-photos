import type { NextApiRequest, NextApiResponse } from 'next';
import { IPhotoList } from '../../types/types';
import { isValidEarthDate, isValidSunDate } from '@/utils/checkers';
import { API_KEY, BASE_URL } from '@/constants/global';
import { HttpStatus } from '@/constants/http';
import { DateTypes } from '@/constants/dummy';
import { photoListToBase64 } from '@/utils/get-base64';
import { BackErrors } from '@/constants/errors';

interface IError {
  error: string;
}

/**
 * Builds the NASA API endpoint based on input parameters.
 * @param {string} rover - The name of the rover.
 * @param {string} page - The page number for pagination.
 * @param {string} dateType - The type of date ('earth_date' or 'sun').
 * @param {string} dateString - The date string (either in 'YYYY-MM-DD' or as a string number for 'sun').
 * @param {string} camera - The type of camera.
 * @returns {string} - The constructed API endpoint.
 * @throws {Error} - Throws an error if the date type or value is invalid.
 */
const buildNasaEndpoint = (
  rover: string,
  page: string,
  dateType: string,
  dateString: string,
  camera?: string
): string => {

  const isValidDate =
    (dateType === DateTypes.EARTH && isValidEarthDate(dateString)) ||
    (dateType === DateTypes.SUN && isValidSunDate(dateString));

  if (!isValidDate) {
    throw new Error('Invalid date type or value for the given data type.');
  }

  const dateParam = dateType === DateTypes.SUN ? '&sol=' : `&${DateTypes.EARTH}=`;
  const cameraParam = camera ? `&camera=${camera.toLowerCase()}` : '';

  return `${BASE_URL}${rover}/photos?page=${page}${dateParam}${dateString}${cameraParam}&api_key=${API_KEY}`;
};

/**
 * Request handler for the NASA photo API.
 * @param {NextApiRequest} req - The incoming HTTP request.
 * @param {NextApiResponse<IPhotoList | IError>} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPhotoList | IError>,
): Promise<void> {
  try {
    const { rover, page, dateType, date, camera } = req.query;

    if (!rover || !page || !dateType || !date) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: BackErrors.WRONG_PARAMS });
    }

    try {
      const endpoint = buildNasaEndpoint(
        rover as string,
        page as string,
        dateType as string,
        date as string,
        camera as string
      );
      const response = await fetch(endpoint);
      if (response.status !== HttpStatus.OK) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: BackErrors.SERVER_ERROR });
      }

      const data: IPhotoList = await response.json();
      const withBase64 = await photoListToBase64(data);

      return res.status(HttpStatus.OK).json(withBase64);
    } catch (error) {
      const errorMessage =
        (error as Error).message || BackErrors.UNKNOW_ERROR;
      return res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: BackErrors.SERVER_ERROR });
  }
}
