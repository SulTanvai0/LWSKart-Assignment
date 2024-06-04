import { getDictionary } from "@/app/[lang]/disctionaries";

import Link from "next/link";

const HerSection = async ({ lang }) => {

    const { hero } = await getDictionary(lang);

    return (
        <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: "url('assets/images/banner-bg.jpg')" }}>
            <div className="container">
                <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                    {hero?.title} <br /> {hero?.title1}
                </h1>
                <p>{hero?.subTitle}</p>
                <div className="mt-12">
                    <Link href={`/${lang}/shop/`} className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">{hero?.button}</Link>
                </div>
            </div>
        </div>

    );
};

export default HerSection;