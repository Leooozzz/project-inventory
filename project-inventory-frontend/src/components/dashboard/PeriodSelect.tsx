"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function PeriodSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("dashboard");

  const currentPeriod = searchParams.get("period") ?? "7";

  function handleChange(period: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);

    router.replace(`?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleChange} value={currentPeriod}>
      <SelectTrigger className="rounded-none">
        <SelectValue placeholder="Período" />
      </SelectTrigger>

      <SelectContent className="rounded-none">
        <SelectItem value="1">{t("select_value_1")}</SelectItem>
        <SelectItem value="7">{t("select_value_2")}</SelectItem>
        <SelectItem value="30">{t("select_value_3")}</SelectItem>
        <SelectItem value="365">{t("select_value_4")}</SelectItem>
      </SelectContent>
    </Select>
  );
}