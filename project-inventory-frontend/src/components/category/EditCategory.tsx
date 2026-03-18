"use client";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryEditFormData,
  categoryEditSchema,
} from "@/app/[locale]/(dashboard)/categories/schema/EditCategory";
import { Input } from "../ui/input";
import { editCategory } from "@/app/[locale]/(dashboard)/categories/api/editCategory";

type Props = {
  id: string;
  token: string;
};
export function EditCategory({ id, token }: Props) {
  const t = useTranslations("category");
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = editCategory(token);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<categoryEditFormData>({
    resolver: zodResolver(categoryEditSchema),
  });

  const handleEditCategoryForm = (data: categoryEditFormData) => {
    mutate(
      { id, data },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-none">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleEditCategoryForm)}
          className="flex flex-col gap-3"
        >
          <DialogHeader>
            <DialogTitle>{t("edit")}</DialogTitle>
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

          <Button type="submit" className="rounded-none" disabled={isPending}>
            {isPending ? t("category_saving") : t("category_save")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
