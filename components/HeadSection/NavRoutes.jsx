'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavRoutes = ({ navRoutes, lang }) => {
    const pathName = usePathname()

    const DPath = pathName ? pathName : `/${lang}/`;

    return (
        <div className="flex items-center space-x-6 capitalize">
            {navRoutes.map((route) => {

                const isSame = DPath === `/${lang}${route.link}`;

                return (
                    <Link key={route.navId} href={`/${lang}${route.link}`} className={`${isSame ? "text-[#fd3d57]" : "text-gray-200"} hover:text-white transition`}>
                        {route.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavRoutes;
