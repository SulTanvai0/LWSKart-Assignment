'use client'

import { useLanguageClient } from "@/contexts/LanguageContext";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({ name }) => {
    const lang = useLanguageClient();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const [term, setTerm] = useState(query);

    useEffect(() => {
        // Set the term from query parameters if they exist
        setTerm(query);
    }, [query]);

    const handleOnChange = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
    };

    const addQuery = (searchKey) => {
        router.replace(`/${lang}/shop?query=${searchKey}`);
    };

    return (
        <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
                <Image src="/icons-svg/search.svg" width={25} height={14} alt="Logo" />
            </span>
            <input onChange={handleOnChange} type="text" name="search" id="search"
                className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                placeholder={name} value={term} />
            <button
                type="button"
                onClick={() => addQuery(term)}
                className="bg-primary border border-primary text-white px-8 py-3 rounded-r-md hover:bg-transparent hover:text-primary transition  items-center justify-center hidden md:flex "
            >
                {name}
            </button>
        </div>
    );
};

export default Search;

