import { getDictionary } from "@/app/[lang]/disctionaries";
import Image from "next/image";

const Features = async ({ lang }) => {

    const { feature } = await getDictionary(lang);

    return (
        <div className="container py-16">
            <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="/assets/images/icons/delivery-van.svg" alt="Delivery" className="w-12 h-12 object-contain" width={48} height={48} />
                    <div>
                        <h4 className="font-medium capitalize text-lg">{feature?.shipping}</h4>
                        <p className="text-gray-500 text-sm">{feature?.order}</p>
                    </div>
                </div>
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="/assets/images/icons/money-back.svg" alt="Delivery" className="w-12 h-12 object-contain" width={48} height={48} />
                    <div>
                        <h4 className="font-medium capitalize text-lg">{feature?.money}</h4>
                        <p className="text-gray-500 text-sm">{feature?.rent}</p>
                    </div>
                </div>
                <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                    <Image src="/assets/images/icons/service-hours.svg" alt="Delivery" className="w-12 h-12 object-contain" width={48} height={48} />
                    <div>
                        <h4 className="font-medium capitalize text-lg">{feature?.support}</h4>
                        <p className="text-gray-500 text-sm">{feature?.customer}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Features;