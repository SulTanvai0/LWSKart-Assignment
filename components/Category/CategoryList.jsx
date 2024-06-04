import Card from "../shared/Card/Card";


const CategorizedList = ({ category, Products }) => {

    return (
        <section className="container py-8">
            <h3 className="font-semibold text-xl">{category}</h3>
            {
                Products.length > 0 ? <> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">

                    {Products.map((Product) => (

                        <Card key={Product?._id} product={Product} />

                    ))}
                </div> </> : <> <div className="flex items-center justify-center h-screen">
                    <h2 className="text-2xl">No data Found</h2>
                </div></>
            }
        </section>
    );
};

export default CategorizedList;