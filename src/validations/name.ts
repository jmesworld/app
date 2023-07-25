import { z } from 'zod'

const minChar = 3
const maxChar = 20

const minCharFullName = 3
const maxCharFullName = 40

export const daoNameSchema = (field) =>
  z
    .string()
    .min(minChar, {
      message: `${field} must exceed ${minChar} characters`,
    })
    .max(maxChar, {
      message: `${field} must not exceed ${maxChar} characters`,
    })
    .regex(/^[a-z0-9]+$/, {
      message: `${field} must only contain lowercase letters and numbers`,
    })

export const nameSchemaForEachChar = z.string().regex(/^[a-z0-9]+$/)
export const capitalNameSchema = z.string().regex(/[A-Z]/)
export const alphaNumericSchema = z.string().regex(/^[a-zA-Z0-9]+$/)
export const specialCharSchema = z
  .string()
  .regex(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)

export const nameSchemaWithSpaceAndLetters = z
  .string()
  .regex(/^[a-zA-Z\s]+$/)

export const fullNameSchema = (field) =>
  z
    .string()
    .min(minCharFullName, {
      message: `${field} must exceed ${minCharFullName} characters`,
    })
    .max(maxCharFullName, {
      message: `${field} must not exceed ${maxCharFullName} characters`,
    })
