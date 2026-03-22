"use client"
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/app/[locale]/(dashboard)/products/api/useDeleteProduct";

type Props = {
  id: string;
  token: string;
};
export function DeleteProductModal({ id, token }: Props) {
  const t = useTranslations("products");
  const { mutate, isPending } = useDeleteProduct(token);
  const handleDelete = () => {
    mutate(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-red-600 hover:bg-red-700 rounded-none"
        >
          <Trash2 size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("delete_title")}</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="outline">{t("delete_button_cancel")}</Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            {t("delete_button")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
