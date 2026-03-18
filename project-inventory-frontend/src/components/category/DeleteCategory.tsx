import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteCategory } from "@/app/[locale]/(dashboard)/categories/api/deleteCategory";
import { useTranslations } from "next-intl";

type Props ={ 
    id:string,
    token:string
}
export function DeleteCategory({ id, token, }: Props) {
  const t= useTranslations("category")
   const { mutate, isPending } = useDeleteCategory(token);

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