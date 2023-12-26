import { string, number } from "yup";

export const titleValidators = string().required()
export const contentValidators = string().required()
export const pageValidator = number().integer().min(1).default(1).required()