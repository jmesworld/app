import {  z } from 'zod'

// should only allow numbers and decimals with 6 places
export const numberSchema = z.string().regex(/^[0-9]+(\.[0-9]{0,6})?$/)