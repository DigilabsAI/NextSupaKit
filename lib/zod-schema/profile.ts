import { z } from 'zod'

export const profileSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    mobile: z.string().max(20).optional(),
    gender: z.enum(['male', 'female', 'other'], {
        message: 'Select a gender'
    })
})