"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  categoryFormData,
  categorySchema,
} from "@/app/[locale]/(dashboard)/categories/schema/CreateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/app/[locale]/(dashboard)/categories/api/CreateCategory";

export function CreateCategoryModal({token}:{token:string}) {
  const t = useTranslations("category");

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = createCategory(token);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<categoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleCategoryForm = (data: categoryFormData) => {
    mutate(data, {
      onSuccess: async (result) => {
        if (!result) {
          console.log("Error creating category.");
          return;
        }
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <div>
      <Button
        className="text-lg font-semibold p-4 flex items-center gap-2 rounded-none"
        onClick={() => setOpen(true)}
      >
        <BadgePlus size={20} />
        {t("new_category")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form
            onSubmit={handleSubmit(handleCategoryForm)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>{t("new_category")}</DialogTitle>
            </DialogHeader>

            <div>
              <Input
                className="rounded-none"
                placeholder={t("category_placeholder")}
                type="text"
                {...register("name")}
              />

              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="rounded-none"
              disabled={isPending}
            >
              {isPending ? t("category_saving") : t("category_save")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}