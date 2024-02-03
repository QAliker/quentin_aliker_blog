import { string, number } from "yup"

const getCharacterValidationError = (str) => `Your password must have at least 1 ${str} character`

export const titleValidators = string().required()
export const contentValidators = string().required()
export const pageValidators = number().integer().min(1).default(1).required()
export const emailValidators = string().email().required()
export const usernameValidators = string().required()
export const passwordValidators = string()
.required("Please enter a password")
.min(8, "Password must have at least 8 characters")
.matches(/[0-9]/u, getCharacterValidationError("digit"))
.matches(/[a-z]/u, getCharacterValidationError("lowercase"))
.matches(/[A-Z]/u, getCharacterValidationError("uppercase"))
export const commentsValidators = string().required()