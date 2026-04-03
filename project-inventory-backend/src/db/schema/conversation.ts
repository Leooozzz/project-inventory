import { boolean, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { teams } from "./teams";
import { contact } from "./contacts";
import { whatsappInstance } from "./whatsappInstances";
import { conversationStatusEnum } from "./enums";


export const chats = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id),
  contactId: uuid("contact_id")
    .notNull()
    .references(() => contact.id),
  instanceId: uuid("instance_id")
    .notNull()
    .references(() => whatsappInstance.id),
  status: conversationStatusEnum("conversation_status").notNull().default("closed"),
  lastMessageAt:timestamp("last_message_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type chat = typeof chats.$inferSelect;
export type newChat = typeof chats.$inferInsert;
