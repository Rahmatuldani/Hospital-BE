import { Response } from 'express';

interface IRespon {
    statusCode: number;
    message: string;
    data?: object;
}

function Respons(res: Response, { statusCode, message, data }: IRespon) {
    let status: string = '';

    switch (statusCode) {
    case 200:
        status = 'OK';
        break;
    
    case 201:
        status = 'Created';
        break;

    case 400:
        status = 'Bad Request';
        break;
    
    case 401:
        status = 'Unauthorized';
        break;
    
    case 404:
        status = 'Not Found';
        break;
    
    case 500:
        status = 'Internal Server Error';
        break;
    
    default:
        status = 'Error';
        break;
    }

    return res.status(statusCode).json({
        status,
        message,
        data: data ?? {}
    });
}

export default Respons;