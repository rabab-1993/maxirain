import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


import { checkCategoryBeforeDelete } from "@/lib/category-utils";

type Params = {
    params: Promise<{ id: string }>;
};

export async function DELETE(_: Request, { params }: Params) {
    try {
        const { id } = await params;
        const categoryId = Number(id);

        if (Number.isNaN(categoryId)) {
            return NextResponse.json(
                { error: "Invalid category id" },
                { status: 400 }
            );
        }

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        const { hasProducts, productsCount } =
            await checkCategoryBeforeDelete(categoryId);

        if (hasProducts) {
            return NextResponse.json(
                {
                    error: `Cannot delete this category because it contains ${productsCount} product(s).`,
                    hasProducts: true,
                    productsCount,
                },
                { status: 400 }
            );
        }

        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("DELETE CATEGORY ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong while deleting category" },
            { status: 500 }
        );
    }
}



export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const category = await prisma.category.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            products: true,
            _count:{
                select: { products: true }
            }
        }
    });

    if (!category) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(category);
}

