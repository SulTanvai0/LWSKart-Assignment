import Image from "next/image";
import Link from "next/link";

const Ads = () => {
    return (

        <div className="container pb-16">
            <Link href="#">
                <Image src="/assets/images/offer.jpg" alt="ads" width={1500} height={300} />
            </Link>

        </div>
    );
};

export default Ads;