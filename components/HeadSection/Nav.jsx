import { getDictionary } from "@/app/[lang]/disctionaries";
import Image from "next/image";
import LanguageBtn from "./LanguageBtn";
import NavItems from "./NavItems";
import NavRoutes from "./NavRoutes";
import SingInOut from "./SingInOut";



const Nav = async ({ lang }) => {

    const { navBar, noFound, category } = await getDictionary(lang);

    const navItems = [
        { navId: "01", link: "/shop?category=Sofa", name: category.Sofa, image: "/assets/images/icons/sofa.svg" },
        { navId: "02", link: "/shop?category=livingRoom", name: category.LivingRoom, image: "/assets/images/icons/terrace.svg" },
        { navId: "03", link: "/shop?category=bedRoom", name: category.BedRoom, image: "/assets/images/icons/bed.svg" },
        { navId: "04", link: "/shop?category=Kitchen", name: category.Kitchen, image: "/assets/images/icons/office.svg" },
        { navId: "05", link: "/shop?category=outdoor", name: category.Outdoor, image: "/assets/images/icons/outdoor-cafe.svg" },
        { navId: "06", link: "/shop?category=mattress", name: category.Mattress, image: "/assets/images/icons/bed-2.svg" },
    ]


    const navRoutes = [
        { navId: "01", link: "/", name: navBar.home },
        { navId: "02", link: "/shop", name: navBar.shop },
        { navId: "03", link: "/aboutus", name: navBar.about },
        { navId: "04", link: "/contactus", name: navBar.contact, },
    ]


    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden ">

                    <span className="capitalize ml-2 text-white hidden ">All Categories</span>
                    <span className="text-white">
                        <div className="">
                            <Image src="/icons-svg/bars.svg" width={28} height={14} alt="Logo" />
                        </div>
                    </span>

                    {/* dropdown */}
                    <NavItems lang={lang} navItems={navItems} />
                </div>

                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">

                    <NavRoutes lang={lang} navRoutes={navRoutes} />
                    <div className="flex justify-center items-center gap-3">
                        <LanguageBtn />
                        <SingInOut lang={lang} names={{ login: navBar.login, logout: navBar.logout }} />
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Nav;

