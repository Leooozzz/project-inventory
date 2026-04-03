import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { teams } from "./teams";

export const contact = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id),
  name: text("name"),
  phone: text("phone").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type contacts = typeof contact.$inferSelect;
export type newContact = typeof contact.$inferInsert;
