import { string, number } from "yup";

const getCharacterValidationError = (str) => {
    return `Your password must have at least 1 ${str} character`;
};

export const titleValidators = string().required()
export const contentValidators = string().required()
export const pageValidators = number().integer().min(1).default(1).required()
export const emailValidators = string().email().required()
export const usernameValidators = string().required()
export const passwordValidators = string()
.required("Please enter a password")
.min(8, "Password must have at least 8 characters")
.matches(/[0-9]/, getCharacterValidationError("digit"))
.matches(/[a-z]/, getCharacterValidationError("lowercase"))
.matches(/[A-Z]/, getCharacterValidationError("uppercase"))