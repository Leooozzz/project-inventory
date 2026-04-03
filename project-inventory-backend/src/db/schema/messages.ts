import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { teams } from "./teams";
import { chats } from "./conversation";
import {
  messageDirectionEnum,
  messageStatusEnum,
  messageTypeEnum,
} from "./enums";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => chats.id),
  direction: messageDirectionEnum("direction").notNull(),
  type: messageTypeEnum("type").notNull().default("text"),
  content: text("content"),
  externalId: text("external_id"),
  status: messageStatusEnum("status").default("sent"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type message = typeof messages.$inferSelect;
export type newMessage = typeof messages.$inferInsert;
