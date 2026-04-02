import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("id:", id);

    const category = await prisma.category.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            products: true,
        }
    });
console.log("category",category);

    if (!category) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(category);
}

