import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Footer() {
  const t = useTranslations("components.header");

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <Image
              src="/images-layout/logo-layout.png"
              alt="Zentory logo"
              height={90}
              width={90}
            />
            <p className="text-sm text-muted-foreground mt-2">
              {t("footer_subtitle")}
            </p>
          </div>

          <nav>
            <h2 className="mb-2 font-semibold">{t("nav_product_title")}</h2>

            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:underline">
                  {t("nav_product_link_1")}
                </Link>
              </li>

              <li>
                <Link href="/features/#prices" className="hover:underline">
                  {t("nav_product_link_2")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h2 className="mb-2 font-semibold">{t("nav_suport_title")}</h2>

            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  {t("nav_suport_link_1")}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  {t("nav_suport_link_2")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="text-sm text-muted-foreground text-center ">
          © 2026 Zentory. {t("footer_rights")}
        </div>
      </div>
    </footer>
  );
}
