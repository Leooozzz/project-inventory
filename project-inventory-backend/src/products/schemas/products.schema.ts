import z from "zod";

const unitTypeEnum =z.enum(["kg","g","l","ml","un"])
export const createProductSchema = z.object({
        name:z.string().min(2,"Name is required").max(255),
        categoryId:z.uuid("Invalid category id format"),
        unitPrice:z.number().int().min(0,"Unit price must be positive"),
        unitType:unitTypeEnum,
        quantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String),
        minimumQuantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String),
        maximumQuantity:z.coerce.number().min(0,"quantity must be positive").default(0).transform(String)
}).refine((data)=>parseFloat(data.maximumQuantity)>=parseFloat(data.minimumQuantity),{
    message:"The maximum quantity must be greater than the minimum.",
    path:['maximumQuantity']
})