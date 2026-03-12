import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BoxesIcon,
  ChartColumn,
  ChartLine,
  History,
  MessageCircle,
  Verified,
  ZapIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function HomePage() {
  const t = useTranslations("main_page");

  const data: { icon: ReactNode; title: string; subtitle: string }[] = [
    {
      icon: <BoxesIcon size={28} />,
      title: t("boxes_title"),
      subtitle: t("boxes_subtitle"),
    },
    {
      icon: <ChartLine size={28} />,
      title: t("balance_title"),
      subtitle: t("balance_subtitle"),
    },
    {
      icon: <MessageCircle size={28} />,
      title: t("whats_title"),
      subtitle: t("whats_subtitle"),
    },
    {
      icon: <ChartColumn size={28} />,
      title: t("graph_title"),
      subtitle: t("graph_subtitle"),
    },
    {
      icon: <Verified size={28} />,
      title: t("verified_title"),
      subtitle: t("verified_subtitle"),
    },
    {
      icon: <History size={28} />,
      title: t("history_title"),
      subtitle: t("history_subtitle"),
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4">
      <section className="flex flex-col md:flex-row justify-between items-center gap-10 mt-10">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-1 bg-green-300/90 px-2 py-1 text-xs w-fit">
            <ZapIcon size={14} />
            {t("intelligent_management")}
          </span>

          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-green-500 via-green-700 to-black bg-clip-text text-transparent">
              {t("title")}
            </h1>

            <p className="text-xl mt-2 text-muted-foreground">
              {t("subtitle_management")}
            </p>

            <Link href="/dashboard">
              <Button className="mt-4 text-lg px-6 py-5 rounded-none">
                {t("button_start")}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <Image
          src="/images-layout/image-page.png"
          alt="Dashboard preview"
          width={600}
          height={400}
          className="w-full max-w-150 h-auto"
          priority
        />
      </section>

      <section className="mt-24">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{t("how_it_work")}</h2>
          <p className="text-lg text-muted-foreground mt-2">
            {t("subtitle_how_it_work")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border  hover:shadow-md transition"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-10 mb-10">
        <Link href="/auth/register">
              <Button className="mt-4 text-2xl p-6 rounded-none ">
                {t("button_start")}
              </Button>
        </Link>
      </div>
    </main>
  );
}
