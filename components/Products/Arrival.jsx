import { getDictionary } from "@/app/[lang]/disctionaries";
import Card from "../shared/Card/Card";

export async function getServerSideProps({ params }) {
    const { lang } = params;

    try {
        const fetchData = await fetch(
            `https://lws-kart-assignment.vercel.app/api/getProductsByFiledName&FiledValue?filedname=NewProduct&filedvalue=true`
        );

        if (!fetchData.ok) {
            throw new Error('Network response was not ok');
        }

        const Products = await fetchData.json();
        const dictionary = await getDictionary(lang);

        return {
            props: {
                Products,
                dictionary
            }
        };
    } catch (error) {
        console.error('Fetch error: ', error);
        return {
            props: {
                Products: null,
                dictionary: null
            }
        };
    }
}

const Arrival = ({ Products, dictionary }) => {
    const { newArrival, noFound } = dictionary || {};

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">{newArrival}</h2>

            {Products?.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
                    {Products?.data?.map((product) => (
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
};

export default Arrival;
