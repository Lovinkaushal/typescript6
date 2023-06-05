import { Response } from 'express'

export const responseWithStatus = (res: Response, status: number, responseData: any) => {
    // @ts-ignore
    return res.status(status).send(responseData);
}