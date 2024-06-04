import { getDictionary } from "@/app/[lang]/disctionaries";
import { auth } from "@/auth";
import { getCartListData, getUserByEmail, getWishListData } from "@/DataBase/quires";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSvg from "../LoadingSvg";
import Search from "./Search";

const Header = async ({ lang }) => {

    const session = await auth();
    let user = null;
    if (session) {
        user = await getUserByEmail(session?.user?.email);
    }

    const { headers } = await getDictionary(lang);



    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image src="/assets/images/logo.svg" width={128} height={32} alt="Logo" />
                </Link>

                <Search lang={lang} name={headers.search} />
                <div className="flex items-center space-x-4">
                    <Suspense fallback={<LoadingSvg />}>
                        <WishList name={headers.wishlist} user={user} lang={lang} />


                    </Suspense>
                    <Suspense fallback={<LoadingSvg />}>
                        <Cart name={headers.cart} user={user} lang={lang} />
                    </Suspense>
                    <Suspense fallback={<LoadingSvg />}>

                        <Profile name={headers.profile} user={user} lang={lang} />

                    </Suspense>
                </div>
            </div>
        </header>
    );
};

const WishList = async ({ user, name, lang }) => {


    let wishList = null;

    if (user) {
        wishList = await getWishListData(user?._id);
    }


    const urlTarget = user ? `/${lang}/wishList` : `/${lang}/authentication/login`

    return (
        <Link href={urlTarget} className="text-center text-gray-700 hover:text-primary transition relative">
            <div className="">
                <Image src="/icons-svg/wish.svg" width={28} height={14} alt="Logo" />
            </div>
            <div
                className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {wishList?.length || 0}</div>
            <div className="text-xs leading-3">{name}</div>

        </Link>
    );
};



const Cart = async ({ user, name, lang }) => {

    let cartList = null;

    if (user) {
        cartList = await getCartListData(user?._id);
    }


    const urlTarget = user ? `/${lang}/cart` : `/${lang}//authentication/login`

    return (
        <>
            <Link href={urlTarget} className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="">
                    <Image src="/icons-svg/cart.svg" width={28} height={14} alt="Logo" />
                </div>
                <div className="text-xs leading-3">{name}</div>
                <div
                    className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                    {cartList?.length || 0}</div>
            </Link>
        </>
    );
};



const Profile = ({ user, name, lang }) => {

    const urlTarget = user ? `/${lang}/profile` : `/${lang}/authentication/login`;

    return (
        <>
            <Link href={urlTarget} className="text-center text-gray-700 hover:text-primary transition flex flex-col items-center justify-center">
                <div className="flex justify-center items-center mb-1">
                    {
                        user?.image
                            ? <Image src={user?.image} width={28} height={28} className="rounded-full" alt={user?.name.split(" ")[0]} />
                            : <Image src="/icons-svg/user.svg" width={28} height={28} alt="Logo" />
                    }
                </div>
                {
                    user?.name
                        ? <div className="text-xs leading-3">{user?.name.split(" ")[0]}</div>
                        : <div className="text-xs leading-3">{name}</div>
                }
            </Link>
        </>
    );
};

export default Header;