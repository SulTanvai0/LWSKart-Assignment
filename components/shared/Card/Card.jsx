import { auth } from "@/auth";
import { getUserByEmail } from "@/DataBase/quires";
import { getBlurData } from "@/utils/plaiceholder";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import Buttons from "./Buttons";

const Card = async ({ product }) => {
    const session = await auth();
    let user = null;

    if (session) {
        user = await getUserByEmail(session?.user?.email);
    }
    const { base64 } = await getBlurData(product?.photosArray[0]);

    return (
        <div className="bg-white shadow rounded overflow-hidden group transform transition-transform duration-300 hover:scale-105">
            <div className="relative h-56 w-64">
                <Image
                    src={product?.photosArray[0]}
                    alt="product"
                    fill
                    placeholder="blur"
                    blurDataURL={base64}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Buttons productId={product?._id} userId={user?._id} />
                </div>
                <div className="absolute top-2 left-2 space-y-1">
                    {product.NewProduct && <p className="tag-label">New</p>}
                    {product.isTrending && <p className="tag-label">Popular</p>}
                </div>
            </div>

            <div className="pt-4 pb-3 px-4">
                <Link href={`/productDetails/${product?._id}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition-colors">
                        {product?.name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">${product?.price}</p>
                    <p className="text-sm text-gray-400 line-through">${product?.discount}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                    </div>
                    <div className="text-xs text-gray-500 ml-3">({product?.reviews})</div>
                </div>
            </div>
            <AddToCartBtn quantity={product?.inStock} productId={product?._id} userId={user?._id} />
        </div>
    );
};

export default Card;
