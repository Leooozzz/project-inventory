import { isNull } from "drizzle-orm"
import { db } from "../../db/connection"
import { users } from "../../db/schema"
import { formatUser } from "../../utils/helper/helper"

export const listUserService = async (offset:number =0 ,limit:number = 10) =>{
    const usersList = await db.select().from(users).where(isNull(users.deletedAt)).offset(offset).limit(limit)

    return usersList.map(formatUser)
}