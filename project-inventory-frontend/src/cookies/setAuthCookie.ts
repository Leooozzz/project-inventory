"use server"

import { setServerAuthToken } from "./serverCookies"

export const setAuthCookies=async(token:string)=>{
    await setServerAuthToken (token)
}