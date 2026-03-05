import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const otp =pgTable("user_otps",{
     id: uuid("id").primaryKey().defaultRandom(),
     code:text("code").notNull(),
     userId:uuid("user_id").notNull().references(()=>users.id),
     expiresAt:timestamp('expires_at').notNull(),
     createdAt: timestamp("created_at").defaultNow().notNull(),
     used: boolean().notNull().default(false)
})


export type Otp = typeof otp.$inferSelect;
export type NewOtp = typeof otp.$inferInsert;