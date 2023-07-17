import prismaDB from "../lib/prismaDB"

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismaDB.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });

  return salesCount;
};
