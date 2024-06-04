import { getDictionary } from "@/app/[lang]/disctionaries";
import Image from "next/image";
import Link from "next/link";
import CopyRight from "./CopyRight";

const Footer = async ({ lang }) => {

    const { footer } = await getDictionary(lang);

    return (
        <>
            <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
                <div className="container grid grid-cols-1">
                    <div className="col-span-1 space-y-4">
                        <Image src="/assets/images/logo.svg" alt="logo" height={30} width={200} />
                        <div className="mr-2">
                            <p className="text-gray-500">
                                {footer?.text}
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <Link href="#" className="text-gray-400 hover:text-gray-500"><i className="fa-brands fa-facebook-square"></i></Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500"><i className="fa-brands fa-instagram-square"></i></Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500"><i className="fa-brands fa-twitter-square"></i></Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500"><i className="fa-brands fa-github-square"></i></Link>
                        </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{footer?.solution}</h3>
                                <div className="mt-4 space-y-4">
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.marketing}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.analytics}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.commerce}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.insights}</Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{footer?.support}</h3>
                                <div className="mt-4 space-y-4">
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.pricing}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.documentation}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.guides}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.api}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{footer?.solution}</h3>
                                <div className="mt-4 space-y-4">
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.marketing}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.analytics}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.commerce}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.insights}</Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{footer?.support}</h3>
                                <div className="mt-4 space-y-4">
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.pricing}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.documentation}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.guides}</Link>
                                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">{footer?.api}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <CopyRight copyright={footer.copyright} />
        </>
    );
};

export default Footer;
