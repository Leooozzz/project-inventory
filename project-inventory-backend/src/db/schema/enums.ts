import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_type", ["super admin", "admin", "user"]);
export const statusTypeEnum = pgEnum("status_type", ["connected", "disconnected"]);
export const unitTypeEnum = pgEnum("unit_type", ["kg","g","l","ml","un"]);
export const moveTypeEnum = pgEnum("move_type", ["in","out"]);
export const messageDirectionEnum = pgEnum("message_direction", ["inbound","outbound"]);
export const messageTypeEnum = pgEnum("message_type", ["text","image","audio","video","file"]);
export const messageStatusEnum = pgEnum("message_status", ["sent","delivered","read"]);
export const conversationStatusEnum = pgEnum("conversation_status", ["open","closed"]);