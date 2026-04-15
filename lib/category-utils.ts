import prisma from "@/lib/prisma";

export async function checkCategoryBeforeDelete(categoryId: number) {
    const productsCount = await prisma.product.count({
        where: {
            categoryId,
        },
    });

    return {
        hasProducts: productsCount > 0,
        productsCount,
    };
}