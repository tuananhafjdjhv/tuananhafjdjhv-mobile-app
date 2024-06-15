export const FULL_NAME_REGEX = /^([A-za-z]+\s)+[a-zA-z]+$/;
export const USER_NAME_REGEX = /(^[a-zA-z0-9]{6,30}$)/;
export const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;
export const EMAIL_REGEX =
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
export const validationRegex = (pattern, data) => {
  return pattern.test(data);
};
