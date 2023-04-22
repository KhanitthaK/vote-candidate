import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isGeneralFunction(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (this.anyError(errors)) {
      const errorMessage = this.findError(errors);

      throw new BadRequestException(
        {
          message: errorMessage,
        },
      );
    }

    return value;
  }

  private isGeneralFunction(validationFunction: unknown): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return types.some(
      (generalFunction) => validationFunction === generalFunction
    );
  }

  private anyError(errors: ValidationError[]): boolean {
    return errors.length > 0;
  }

  private findError(validationErrors: ValidationError[]) {
    return validationErrors.reduce(
      (errorMessages, { children, constraints, property }) => {
        if (constraints) {
          const messages = Object.values(constraints).map((message) => {
            if (message.includes('regular expression')) {
              return `[${property}] is invalid`;
            }

            const searchRegExp = new RegExp(
              `^${property} | ${property} | ${property}$`
            );

            return message.replace(searchRegExp, (propertyWithSpaces) => {
              return propertyWithSpaces.replace(property, `[${property}]`);
            });
          });

          return [...errorMessages, ...messages];
        }

        return [...errorMessages, ...this.findError(children)];
      },
      []
    );
  }
}
