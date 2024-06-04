import Image from "next/image";
import Link from "next/link";

const NavItems = ({ navItems, lang }) => {
    return (
        <div className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
            style={{ width: '300px' }}>

            {navItems.map(item => (
                <Link key={item.navId} href={`/${lang}${item.link}`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                    <Image src={item.image} alt={item.name} width={25} height={5} className=" object-contain" />
                    <span className="ml-6 text-gray-600 text-sm">{item.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default NavItems;