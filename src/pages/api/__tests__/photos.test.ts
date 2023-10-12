import { createMocks, RequestOptions, RequestMethod } from 'node-mocks-http';
import handlePhotos from '../photos';
import { HttpStatus, HttpMethods } from '@/constants/http';
import fetchMock from 'jest-fetch-mock';
import { BackErrors } from '@/constants/errors';

jest.mock('../../../utils/get-base64', () => ({
  photoListToBase64: jest.fn().mockResolvedValue({
    photos: [
      { id: 1, url: 'photo1.jpg', base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjELaY/h8AAyYB4nI4OS8AAAAASUVORK5CYII=' },
      { id: 2, url: 'photo2.jpg', base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjELaY/h8AAyYB4nI4OS8AAAAASUVORK5CYII=' },
    ]
  }),
}));

const handleBuildRequestOptions = (
  method: RequestMethod,
  query: Record<string, string>
): RequestOptions => {
  const { rover, page, dateType, date } = query;
  return {
    method,
    query: {
      rover,
      page,
      dateType,
      date,
    },
  };
};

describe('Photos API test suite - /api/photos', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle successful API response', async () => {
    const { req, res } = createMocks(
      handleBuildRequestOptions(HttpMethods.GET, {
        rover: 'Curiosity',
        page: '1',
        dateType: 'earth_date',
        date: '2016-09-15',
      })
    );

    fetchMock.mockResolvedValue({
      status: HttpStatus.OK,
      json: async () => ({
        photos: [
          { id: 1, url: 'photo1.jpg' },
          { id: 2, url: 'photo2.jpg' },
        ],
      }),
    } as Response);

    await handlePhotos(req, res);
    expect(res._getStatusCode()).toBe(HttpStatus.OK);
    const responseData = JSON.parse(res._getData() as string);
    expect(responseData).toHaveProperty('photos');
    expect(responseData.photos.length).toBe(2);
  });

  it('should handle empty query params', async () => {
    const { req, res } = createMocks(
      handleBuildRequestOptions(HttpMethods.GET, {})
    );

    fetchMock.mockResolvedValue({
      status: HttpStatus.BAD_REQUEST,
    } as Response);

    await handlePhotos(req, res);
    expect(res._getStatusCode()).toBe(HttpStatus.BAD_REQUEST);
    const responseData = JSON.parse(res._getData() as string);
    expect(responseData.error).toBe(BackErrors.WRONG_PARAMS);
  });

  it('should handle when date type different than date value', async () => {
    const { req, res } = createMocks(
      handleBuildRequestOptions(HttpMethods.GET, {
        rover: 'Curiosity',
        page: '1',
        dateType: 'sun',
        date: '2016-09-15',
      })
    );

    fetchMock.mockResolvedValue({
      status: HttpStatus.BAD_REQUEST,
    } as Response);

    await handlePhotos(req, res);
    expect(res._getStatusCode()).toBe(HttpStatus.BAD_REQUEST);
    const responseData = JSON.parse(res._getData() as string);
    expect(responseData.error).toBe(
      'Invalid date type or value for the given data type.'
    );
  });
});
