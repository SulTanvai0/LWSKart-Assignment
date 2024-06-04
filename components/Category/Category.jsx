import { getDictionary } from "@/app/[lang]/disctionaries";
import Image from "next/image";
import Link from "next/link";

const Category = async ({ lang }) => {

    const { category } = await getDictionary(lang);

    const categories = [
        { id: "01", name: category.BedRoom, link: "BedRoom", image: "/assets/images/category/category-1.jpg" },

        { id: "02", name: category.Mattress, link: "Mattress", image: "/assets/images/category/category-2.jpg" },
        { id: "03", name: category.Outdoor, link: "Outdoor", image: "/assets/images/category/category-3.jpg" },
        { id: "04", name: category.Sofa, link: "Sofa", image: "/assets/images/category/category-4.jpg" },
        { id: "05", name: category.LivingRoom, link: "Living Room", image: "/assets/images/category/category-5.jpg" },

        { id: "06", name: category.Kitchen, link: "Kitchen", image: "/assets/images/category/category-6.jpg" },
    ];

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">{category.category}</h2>
            <div className="w-[80%] mx-auto">
                <div className="grid grid-cols-3 gap-6">
                    {categories.map((cate) => (
                        <div key={cate.id} className="relative rounded-md overflow-hidden group shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="relative w-full h-64">
                                <Image
                                    src={cate.image}
                                    alt={`category ${cate.name}`}
                                    fill
                                    quality={100}
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <Link href={`${lang}/category/${cate.link}`} className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-opacity-20 to-gray-500 to-opacity-40 flex items-center justify-center text-3xl text-[#fd3d57] font-roboto font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                {cate.name}

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
