"use client";

import Image from "next/image";
import { LayoutDashboard, LogOutIcon, LucideLanguages } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

type UserLogged = {
  name: string;
  email: string;
  avatar: string | null;
  isAdmin: boolean;
};
export function Header({ user }: { user: UserLogged | null }) {
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
        <Link href={"/"}>
          <Image
            src="/images-layout/logo-layout.png"
            alt="Zentory logo"
            width={90}
            height={90}
          />
        </Link>

        <div className="flex gap-3">
          <Select value={locale} onValueChange={changeLanguage}>
            <SelectTrigger className="flex gap-2 py-5 items-center border-2 cursor-pointer rounded-none">
              <LucideLanguages size={20} />
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-none">
              <SelectItem value="pt" className="rounded-none">
                Pt-br
              </SelectItem>
              <SelectItem value="en" className="rounded-none">
                En-us
              </SelectItem>
            </SelectContent>
          </Select>
          {user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="rounded-none">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 rounded-none"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.avatar ?? user.name?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-sm font-medium">
                        {user.name.split(" ")[0]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 rounded-none">
                  <DropdownMenuItem className="rounded-none">
                    <Link href={"/dashboard"}>
                      Dashboard
                    </Link>
                    <DropdownMenuShortcut><LayoutDashboard/></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-none text-red-600 cursor-pointer">
                    Logout
                    <DropdownMenuShortcut><LogOutIcon className="text-red-600"/></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/auth/register">
              <Button className="py-5 cursor-pointer rounded-none flex">
                {t("button_header")}
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
}
