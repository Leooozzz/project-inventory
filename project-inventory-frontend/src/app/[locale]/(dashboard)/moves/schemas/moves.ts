import z from "zod";

const typeMoves = z.enum(["out", "in"]);
export const movesSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  type: typeMoves,
});


export  type movesFormData = z.infer<typeof movesSchema>;