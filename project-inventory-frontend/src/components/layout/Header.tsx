"use client";

import Image from "next/image";
import { LucideLanguages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Header() {
  const t = useTranslations("components.header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(currentLocale: (typeof routing.locales)[number]) {
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );

    router.replace({ pathname, query }, { locale: currentLocale });
  }

  return (
    <header className="bg-gray-50">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
      <Image
        src="/images-layout/logo-layout.png"
        alt="Zentory logo"
        width={90}
        height={90}
      />

      <div className="flex gap-3">
        <Select value={locale} onValueChange={changeLanguage}>
          <SelectTrigger className="flex gap-2 py-5 items-center border-2 cursor-pointer rounded-none">
            <LucideLanguages size={20} />
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="pt">Pt-br</SelectItem>
            <SelectItem value="en">En-us</SelectItem>
          </SelectContent>
        </Select>

        <Button className="py-5 cursor-pointer rounded-none">
          <Link href={"/auth/register"}>{t("button_header")}</Link>
        </Button>
      </div>
      </div>
    </header>
  );
}
