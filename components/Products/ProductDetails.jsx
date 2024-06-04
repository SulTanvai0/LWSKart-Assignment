
import { getDictionary } from "@/app/[lang]/disctionaries";
import Image from "next/image";
import { Suspense } from "react";
import LoadingSvg from "../LoadingSvg";
import AddToCartBtn from "../shared/Card/AddToCartBtn";
import AddToWishListButton from "../shared/Card/AddToWishListButton";
import Breadcrumb from "../Shop/Breadcrumb";
import ImageDiv from "./ImageDiv";
import RelatedProducts from "./RelatedProducts";
import SocialShare from "./SocialShare";

const ProductDetails = async ({ product, user, lang }) => {

    const { productDetails } = await getDictionary(lang);

    return (
        <div className="container mx-auto p-10 animate-fadeIn">
            <Breadcrumb />

            <div className="grid grid-cols-2 gap-6">
                <ImageDiv photosArray={product?.photosArray} />

                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{product?.name}</h2>
                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                            <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                            <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                            <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                            <Image src="/icons-svg/star.svg" width={18} height={14} alt="Star" />
                        </div>
                        <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>{productDetails?.availability}: </span>
                            <span className="text-green-600">{product?.availability} {product?.inStock}</span>
                        </p>
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>{productDetails?.inStock}: </span>
                            <span className="text-green-600">{product?.inStock} pcs</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">{productDetails.brand}: </span>
                            <span className="text-gray-600">{product?.brand}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">{productDetails.category}: </span>
                            <span className="text-gray-600">{product?.category}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">{productDetails.sku}: </span>
                            <span className="text-gray-600">{product?.SKU}</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">${product?.price}</p>
                    </div>
                    <p className="mt-4 text-gray-600">{product?.description}</p>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <div className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <AddToCartBtn quantity={product?.inStock} productId={product?._id} userId={user?._id} />
                        </div>
                        <div className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <AddToWishListButton productId={product?._id} userId={user?._id} />
                        </div>
                    </div>

                    <SocialShare socialUrl={`${process.env.LWSKART_URl}/productDetails/${product?._id}`} name={product?.name} />
                </div>
            </div>

            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {productDetails?.productDetails}
                </h2>
                <div className="w-3/5 pt-6">
                    <div className="text-gray-600">
                        <ol className="list-decimal">
                            {product?.detailDescription && product?.detailDescription.map((text, i) => (
                                <li key={i} className="mt-4 text-gray-600">{text}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingSvg />}>
                <RelatedProducts name={productDetails?.relatedProducts} category={product?.category} user={user} />
            </Suspense>
        </div>
    );
};

export default ProductDetails;
