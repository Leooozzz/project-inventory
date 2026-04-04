import { and, eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { moves, NewMove, products } from "../../db/schema";
import { AppError } from "../../utils/apperror";

export const addMoveService = async (data: Omit<NewMove, "unitPrice">) => {
  return await db.transaction(async (tx) => {
    const product = await tx
      .select({
        quantity: products.quantity,
        unitPrice: products.unitPrice,
      })
      .from(products)
      .where(
        and(eq(products.id, data.productId), eq(products.teamId, data.teamId)),
      )
      .for("update");

    if (product.length === 0) {
      throw new AppError("Product not found", 404);
    }
    const currentQuantity = parseFloat(product[0].quantity);
    const moveQuantity = parseFloat(data.quantity);
    if (data.type === "out") {
      if (currentQuantity < moveQuantity) {
        throw new AppError(
          `Insufficient stock, available ${currentQuantity}, requested ${moveQuantity} `,
          404,
        );
      }
    }
    const unitPrice = product[0].unitPrice;
    if (!unitPrice) return null;
    const result = await tx
      .insert(moves)
      .values({ ...data, unitPrice })
      .returning();
    const move = result[0];
    const newQuantity =
      data.type === "in"
        ? currentQuantity + moveQuantity
        : currentQuantity - moveQuantity;
    await tx
      .update(products)
      .set({ quantity: newQuantity.toString(), updatedAt: new Date() })
      .where(
        and(eq(products.id, data.productId), eq(products.teamId, data.teamId)),
      );

    return move;
  });
};
