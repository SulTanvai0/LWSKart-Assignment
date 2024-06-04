import { getBlurData } from "@/utils/plaiceholder";
import Image from "next/image";

const NewImage = async ({ image }) => {
    const { base64 } = await getBlurData(image);
    return (
        <Image
            src={image}
            alt="product"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={base64}
            className="w-full h-full"
        />
    );
};

export default NewImage;
