import z from "zod";
const unitTypeEnum =z.enum(["kg","g","l","ml","un"])
export const updateProductSchema = z.object({
     name:z.string().min(2,"Name is required").max(255).optional(),
        categoryId:z.uuid("Invalid category id format").optional(),
        unitPrice:z.number().int().min(0,"Unit price must be positive").optional(),
        unitType:unitTypeEnum.optional(),
        quantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String).optional(),
        minimumQuantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String).optional(),
        maximumQuantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String).optional()
})