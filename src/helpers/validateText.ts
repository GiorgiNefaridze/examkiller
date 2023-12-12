type validateTextType = (fields: { [key: string]: string }) => boolean;

const validateText: validateTextType = (fields) => {
  const fieldsArray = Object.values(fields);
  return fieldsArray.every((el) => Boolean(el.length));
};

export { validateText };
