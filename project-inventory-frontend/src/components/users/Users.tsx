import { Separator } from "../ui/separator";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import { CreateUserModal } from "./CreateUserModal";

export function Users({ token }: { token: string }) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Usuários</h1>
        <CreateUserModal token={token} />
      </div>
      <div className="mt-10 mb-10">
      <Separator />
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Ações</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            
        </TableBody>
      </Table>
      </div>
    </section>
  );
}
