"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function PeriodSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const period = searchParams.get("period") ?? "1";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("period", value);
    router.replace(`?${params.toString()}`);
  };
  const t = useTranslations("dashboard")
  return (
    <Select onValueChange={handleChange} defaultValue={period}>
       <h1 className=" text-lg">{t("period")}</h1>
      <SelectTrigger>
        <SelectValue placeholder="Período" />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value="1">{t("select_value_1")}</SelectItem>
        <SelectItem value="7">{t("select_value_2")}</SelectItem>
        <SelectItem value="30">{t("select_value_3")}</SelectItem>
        <SelectItem value="365">{t("select_value_4")}</SelectItem>
      </SelectContent>
    </Select>
  );
}