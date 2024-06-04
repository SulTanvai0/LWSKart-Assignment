import { useLanguageClient } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import Buttons from "./Buttons";

const ClientCard = ({ Product, user }) => {

    const lang = useLanguageClient();

    return (
        <div className="bg-white shadow rounded overflow-hidden group transform transition-transform duration-300 hover:scale-105">
            <div className="relative h-56 w-64">

                <Image
                    src={Product?.photosArray[0]}
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Buttons productId={Product?._id} userId={user?._id} />
                </div>
                <div className="absolute top-2 left-2 space-y-1">
                    {Product.NewProduct && <p className="tag-label">New</p>}
                    {Product.isTrending && <p className="tag-label">Popular</p>}
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link href={`/${lang}/productDetails/${Product?._id}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition-colors">
                        {Product?.name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">${Product?.price}</p>
                    <p className="text-sm text-gray-400 line-through">${Product?.discount}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                    </div>
                    <div className="text-xs text-gray-500 ml-3">({Product?.reviews})</div>
                </div>
            </div>
            <AddToCartBtn quantity={Product?.inStock} productId={Product?._id} userId={user?._id} />
        </div>
    );
};

export default ClientCard;
