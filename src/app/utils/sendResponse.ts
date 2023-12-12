import { Response } from 'express';

interface IMeta {
  page:number,
  limit:number,
  total:number
}
interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?:IMeta;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    meta:data?.meta,
    data: data?.data
  });
};

export default sendResponse;
