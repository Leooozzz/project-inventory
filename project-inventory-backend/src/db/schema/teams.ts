import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Teams = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
