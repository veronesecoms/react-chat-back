import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware(
  type: any,
  groups: undefined | any = undefined,
  skipMissingProperties: boolean = false
): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), {
      groups,
      skipMissingProperties
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export default validationMiddleware;
