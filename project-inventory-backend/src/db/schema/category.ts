import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { teams } from "./teams";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  deletedAt: timestamp("deleted_at"),
   teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type newCategory = typeof categories.$inferInsert;
