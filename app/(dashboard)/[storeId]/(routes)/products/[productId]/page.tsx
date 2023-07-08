import prismaDB from "@/lib/prismaDB";
import ProductForm from "./components/ProductForm";

interface Props {
    params: {
        sizeId: string;
        storeId: string;
        productId: string;
        colorId: string;
        categoryId: string;
    };
}

async function ProductsPage({ params }: Props) {

    const product = await prismaDB.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            images: true,
        },
    });

    const categories = await prismaDB.category.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const sizes = await prismaDB.size.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const colors = await prismaDB.color.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 ">
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    initialData={product}
                />
            </div>
        </div>
    );
}

export default ProductsPage;
