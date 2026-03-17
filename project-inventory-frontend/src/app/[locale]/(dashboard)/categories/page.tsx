import { Categories } from "@/components/category/Categories";
import { requiredUserLogged } from "@/cookies/authValidate";
import { cookies } from "next/headers";

export default async function Page(){
    await requiredUserLogged();
    const token = (await cookies()).get("auth_token")?.value ?? "";
    return(
        <main className="p-4">
            <div>
                <Categories token={token}/>
            </div>
        </main>
    )
}