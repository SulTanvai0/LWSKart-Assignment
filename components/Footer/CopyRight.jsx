import Image from "next/image";

const CopyRight = ({ copyright }) => {
    return (
        <div className="bg-gray-800 py-4">
            <div className="container flex items-center justify-between">
                <p className="text-white">&copy; <span className="font-extrabold">{copyright?.brand}</span>{copyright?.text}</p>
                <div>
                    <Image src="/assets/images/methods.png" alt="methods" height={50} width={500} />
                </div>
            </div>
        </div>
    );
};

export default CopyRight;