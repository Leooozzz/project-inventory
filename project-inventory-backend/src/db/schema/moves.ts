import { integer, numeric, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";
import { teams } from "./teams";
import { moveTypeEnum } from "./enums";



export const moves = pgTable('moves',{
    id:uuid('id').primaryKey().defaultRandom(),
    productId:uuid('product_id').notNull().references(()=>products.id),
     teamId: uuid("team_id")
        .notNull()
        .references(() => teams.id),
    userId:uuid('user_id').notNull().references(()=>users.id),
    type:moveTypeEnum('type').notNull(),
    quantity:numeric('quantity').notNull(),
    unitPrice:integer('unit_price').notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow()
})

export type Move = typeof moves.$inferSelect;
export type NewMove = typeof moves.$inferInsert;