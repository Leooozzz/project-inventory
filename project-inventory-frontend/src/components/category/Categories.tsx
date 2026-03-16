import { BadgePlus } from "lucide-react";
import { Button } from "../ui/button";

export function Categories() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categorias</h1>
        <div className="flex justify-end">
          <Button className="text-lg font-semibold p-4 items-center">
            <BadgePlus size={20} />
            Adicionar
          </Button>
        </div>
      </div>
    </section>
  );
}
