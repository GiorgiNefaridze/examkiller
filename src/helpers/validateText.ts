type validateTextType = (array: string[]) => boolean;

const validateText: validateTextType = (array) => {
  return array.every((el) => Boolean(el.length));
};

export { validateText };
