import { string } from "yup";

export const titleValidators = string().required()
export const contentValidators = string().required()