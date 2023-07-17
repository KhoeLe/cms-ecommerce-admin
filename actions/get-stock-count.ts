import prismaDB from "../lib/prismaDB"


export const getStockCount = async (storeId: string) => {
  const stockCount = await prismaDB.product.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount;
};
