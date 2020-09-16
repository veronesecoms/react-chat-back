import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export function HasMaxSize(
  maxSizeFile: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'hasMaxSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [maxSizeFile],
      options: validationOptions,
      validator: {
        validate(base64Data: any, args: ValidationArguments) {
          const [maxBase64] = args.constraints;
          const buffer = Buffer.from(
            base64Data.substring(base64Data.indexOf(',') + 1),
            'base64'
          );
          const imageSize = buffer.length;
          return imageSize < maxBase64;
        }
      }
    });
  };
}
