import { ValidationError } from 'class-validator';

const toErrorMessage = (message: string, property: string): string => {
  const searchRegExp = new RegExp(`^${property} | ${property} | ${property}$`);

  return message.replace(searchRegExp, (propertyWithSpaces) => {
    return propertyWithSpaces.replace(property, `[${property}]`);
  });
};

export const findErrorMessages = (
  validationErrors: ValidationError[]
): string[] => {
  return validationErrors.reduce<string[]>(
    (errorMessages, { children, constraints, property }) => {
      if (constraints) {
        const messages = Object.values(constraints).map((message) =>
          toErrorMessage(message, property)
        );

        return errorMessages.concat(messages);
      }

      return errorMessages.concat(findErrorMessages(children));
    },
    []
  );
};
