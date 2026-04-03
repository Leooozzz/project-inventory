import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { teams } from "./teams";
import { statusTypeEnum } from "./enums";

export const whatsappInstance = pgTable("whatsapp_instance", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id),
  name: text("name"),
  phone: text("phone_number"),
  status: statusTypeEnum("status_type").notNull().default("disconnected"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type instance = typeof whatsappInstance.$inferSelect;
export type newInstance = typeof whatsappInstance.$inferInsert;
