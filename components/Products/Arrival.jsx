import { getDictionary } from "@/app/[lang]/disctionaries";
import Card from "../shared/Card/Card";
import { getArrivalData } from "@/DataBase/quires";

const Arrival = async ({ lang }) => {
    try {
        const Products = await getArrivalData();
        console.log("Fetched Products:", Products);

        const { newArrival, noFound } = await getDictionary(lang);

        return (
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">{newArrival}</h2>

                {Products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
                        {Products.map((product) => (
                            <Card key={product?._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <h2 className="text-2xl">{noFound}</h2>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error in Arrival component:", error);
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-2xl">An error occurred while loading products.</h2>
            </div>
        );
    }
};

export default Arrival;