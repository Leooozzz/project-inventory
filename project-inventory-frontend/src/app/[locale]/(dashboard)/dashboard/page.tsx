import { MovesGraph } from "@/components/dashboard/MovesGraph";
import { NosaleStock } from "@/components/dashboard/NosaleStock";
import { PeriodSelect } from "@/components/dashboard/PeriodSelect";
import { ResumeStock } from "@/components/dashboard/ResumeStock";
import { requiredUserLogged } from "@/cookies/authValidate";
import { cookies } from "next/headers";



export default async function DashboardPage( searchParams: { period?: string }) {
  await requiredUserLogged();
  const token = (await cookies()).get("auth_token")?.value ?? "";
  const period = Number(searchParams.period ?? "1");
  return (
    <main className="p-4">
      <div className="flex justify-end mb-5 items-center gap-2">
       <PeriodSelect/>
      </div>
      <ResumeStock token={token} period={period}/>
      <MovesGraph token={token} period={period}/>
      <NosaleStock token={token} period={period}/>
    </main>
  );
}
