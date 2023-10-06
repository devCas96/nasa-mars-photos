import { mocked } from 'jest-mock';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../photos';
import { HttpStatus } from '@/pages/constants/httpStatus';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('Photos API test suite', () => {
  let mockRequest: Partial<NextApiRequest>;
  let mockResponse: Partial<NextApiResponse>;

  beforeEach(() => {
    mockRequest = {
      query: {
        rover: 'Curiosity',
        page: '1',
        dateType: 'earth_date',
        date: '2016-09-15',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should handle valid request', async () => {
    mocked(fetch).mockReturnValueOnce(
      Promise.resolve({
        status: HttpStatus.OK,
        json: async () => ({ mockData: 'mockData' }),
      } as Response)
    );

    await handler(
      mockRequest as NextApiRequest,
      mockResponse as NextApiResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mockData: 'mockData',
    });
  });

  it('should handle invalid request parameters', async () => {
    mockRequest = {}; // Simular una solicitud con parámetros faltantes

    await handler(
      mockRequest as NextApiRequest,
      mockResponse as NextApiResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Invalid request parameters',
    });
  });

  it('should handle invalid date type', async () => {
    mockRequest.query!.dateType = 'invalidDateType';

    await handler(
      mockRequest as NextApiRequest,
      mockResponse as NextApiResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Invalid date type or value for the given data type.',
    });
  });
});
