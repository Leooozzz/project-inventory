"use client";

import { CalendarClockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

export function NewMoveModal({ token }: { token: string }) {
  const t = useTranslations("moves");
  const [open, setOpen] = useState(false);
  return (
    <section>
      <Button
        className="text-lg font-semibold p-4 flex items-center gap-2 rounded-none"
        onClick={() => setOpen(true)}
      >
        <CalendarClockIcon size={20} />
        {t("moves_button")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form action="" method="post">
            <DialogHeader>
              <DialogTitle>{t("moves_modal")}</DialogTitle>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
