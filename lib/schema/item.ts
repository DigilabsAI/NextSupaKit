//Item Zod schema and type definition

import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2),
    owner: z.string().optional(),
    category: z.string().min(2),
    description: z.string().optional(),
});
export type ItemFormValues = z.infer<typeof ItemSchema>;