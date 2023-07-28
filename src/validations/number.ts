import {  z } from 'zod'

export const numberSchema = z.string().regex(/^[0-9]+$/)