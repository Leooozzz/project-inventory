import { Moves } from "@/components/moves/Moves";
import { requiredUserLogged } from "@/cookies/authValidate";
import { cookies } from "next/headers";

export default async function Page(){
     await requiredUserLogged();
    const token = (await cookies()).get("auth_token")?.value ?? "";
    return(
        <main className="p-4">
            <div>
                <Moves token={token}/>
            </div>
        </main>
    )
}