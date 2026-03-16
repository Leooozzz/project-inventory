import { cookies } from "next/headers";

export const getServerAuthToken = async () =>{
    const cookieStore = await cookies();
    return cookieStore.get('')?.value || null;

}
export const setServerAuthToken = async (token:string) =>{
    const cookieStore =await cookies()
    cookieStore.set('auth_token',token,{httpOnly:true})
}

export const clearServerAuthToken = async()=>{
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
}