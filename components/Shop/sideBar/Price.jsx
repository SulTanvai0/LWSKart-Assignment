"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const Price = ({ name }) => {
    const [price, setPrice] = useState({ min: "", max: "" });
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Memoize the URLSearchParams instance
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

    // Handle input changes and update state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPrice((prevPrice) => ({ ...prevPrice, [name]: value }));
    };

    const min = params.get('min');
    const max = params.get('max');



    useEffect(() => {
        if (min && max) {
            setPrice({ min: min, max: max });
            params.set('min', min);
            params.set('max', max);
            router.replace(`${pathname}?${params.toString()}`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    // Effect to update URL when price state changes
    useEffect(() => {

        params.set('min', price.min);
        params.set('max', price.max);

        if (price.min && price.max) {
            router.replace(`${pathname}?${params.toString()}`);
        }

    }, [price]);


    return (
        <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{name}</h3>
            <div className="mt-4 flex items-center">
                <input
                    type="number"
                    name="min"
                    id="min"
                    onChange={handleChange}
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="min"
                    value={price?.min}
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                    type="number"
                    onChange={handleChange}
                    value={price?.max}
                    name="max"
                    id="max"
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="max"
                />
            </div>
        </div>
    );
};

export default Price;
