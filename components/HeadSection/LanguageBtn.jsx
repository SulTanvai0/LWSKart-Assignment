"use client"

import { useLanguageClient } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageBtn = () => {
    const lang = useLanguageClient();
    const [language, setLanguage] = useState(lang);
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        setLanguage(lang);
    }, [lang]);

    const changeLanguage = () => {
        const newLanguage = language === "en" ? "bn" : "en";
        setLanguage(newLanguage);
        const newPathName = pathName.replace(`/${language}`, `/${newLanguage}`);
        router.refresh(newPathName);
        router.replace(newPathName);
    };

    return (
        <div className="">
            <div
                className=" border  border-rose-50relative inline-block w-24 h-10 rounded-full overflow-hidden bg-primary cursor-pointer hover:bg-primary-dark transition duration-300"
                onClick={changeLanguage}
            >
                <div
                    className={`absolute w-12 h-10 bg-gray-800 flex justify-center items-center transition-transform duration-300 rounded-full transform ${language === 'bn' ? 'translate-x-full' : ''}`}
                >
                    <span className={`text-gray-200 font-bold text-sm ${language === 'bn' ? 'hidden' : 'block'}`}>English</span>
                    <span className={`text-gray-200 font-bold text-sm ${language === 'bn' ? 'block' : 'hidden'}`}>Bangla</span>
                </div>
            </div>
        </div>
    );
};

export default LanguageBtn;
