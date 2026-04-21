import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkCategoryBeforeDelete } from "@/lib/category-utils";
import { supabaseAdmin } from "@/lib/supabase/admin";

// const supabase = supabaseAdmin;

// type Params = {
//     params: Promise<{ id: string }>;
// };

// export async function DELETE(_: Request, { params }: Params) {
//     try {
//         const { id } = await params;
//         const categoryId = Number(id);

//         if (Number.isNaN(categoryId)) {
//             return NextResponse.json(
//                 { error: "Invalid category id" },
//                 { status: 400 }
//             );
//         }

//         const category = await prisma.category.findUnique({
//             where: { id: categoryId },
//         });

//         if (!category) {
//             return NextResponse.json(
//                 { error: "Category not found" },
//                 { status: 404 }
//             );
//         }
//         // Delete image from Supabase if it exists
//         if (category.imageUrl) {
//             try {
//                 const url = new URL(category.imageUrl);

//                 const fileName = url.pathname.split("/").pop();
//                 console.log('filename:', fileName);

//                 if (fileName) {
//                     const {data, error } = await supabase.storage
//                         .from("categories")
//                         .remove([fileName]);
// console.log('data:',data);

//                     if (error) {
//                         console.error("Supabase delete error:", error.message);
//                     }
//                 }
//             } catch (err) {
//                 console.error("Invalid image URL:", err);
//             }
//         }

//         const { hasProducts, productsCount } =
//             await checkCategoryBeforeDelete(categoryId);
//         // chesk if category has products before deleting
//         if (hasProducts) {
//             return NextResponse.json(
//                 {
//                     error: `Cannot delete this category because it contains ${productsCount} product(s).`,
//                     hasProducts: true,
//                     productsCount,
//                 },
//                 { status: 400 }
//             );
//         }

//         await prisma.category.delete({
//             where: {
//                 id: categoryId,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Category deleted successfully",
//         });
//     } catch (error) {
//         console.error("DELETE CATEGORY ERROR:", error);

//         return NextResponse.json(
//             { error: "Something went wrong while deleting category" },
//             { status: 500 }
//         );
//     }
// }


type Params = {
    params: Promise<{ id: string }>;
};

function extractStoragePath(imageUrl: string) {
    try {
        const url = new URL(imageUrl);


        const marker = "/storage/v1/object/public/categories/";
        const index = url.pathname.indexOf(marker);

        if (index === -1) return null;

        const path = url.pathname.substring(index + marker.length);
        return decodeURIComponent(path);
    } catch {
        return null;
    }
}

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
        // check if category has products before deleting
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
        // Delete image from Supabase if it exists
        if (category.imageUrl) {
            const storagePath = extractStoragePath(category.imageUrl);

            if (storagePath) {
                const { error: storageError } = await supabaseAdmin.storage
                    .from("categories")
                    .remove([storagePath]);

                if (storageError) {
                    console.error("Supabase delete error:", storageError.message);

                    return NextResponse.json(
                        {
                            error: "Failed to delete image from storage",
                            details: storageError.message,
                        },
                        { status: 500 }
                    );
                }
            }
        }

        await prisma.category.delete({
            where: { id: categoryId },
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
            _count: {
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

