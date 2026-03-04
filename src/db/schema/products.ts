import { integer, numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories } from "./category";

export const unitTypeEnum = pgEnum('unit_type',['kg','g','l','ml','un'])

export const products = pgTable('products',{
    id:uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull(),
    categoryId:uuid('category_id').notNull().references(()=>categories.id),
    unitPrice: integer('unit_price'),
    unitType:unitTypeEnum('unit_type').notNull().default('un'),
    quantity:numeric('quantity').notNull().default('0'),
    minimumQuantity:numeric('minumum_quantity').notNull().default('0'),
    maximumQuantity:numeric('maximum_quantity').notNull().default('0'),
    deletedAt:timestamp('deleted_at'),
    createdAt:timestamp('created_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().defaultNow()
})

export type Product = typeof products.$inferSelect;
export type newProduct = typeof products.$inferInsert;