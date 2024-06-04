'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const sizesArray = [
    { id: "size-xs", name: "XS" },
    { id: "size-s", name: "S" },
    { id: "size-m", name: "M" },
    { id: "size-l", name: "L" },
    { id: "size-xl", name: "XL" }
];

const Sizes = ({ name }) => {
    const [isClick, setIsClick] = useState(false);;
    const [size, setSize] = useState();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSize(value);

    };

    useEffect(() => {
        if (size) {
            params.set('size', size);
            router.replace(`${pathname}?${params.toString()}`);
        }


    }, [size]);




    const SizePath = params.get('size')

    return (
        <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{name}</h3>
            <div className="flex items-center gap-2">
                {sizesArray.map((sizeOption) => (
                    <div key={sizeOption.id} className="size-selector">
                        <input
                            type="radio"
                            onChange={handleChange}
                            checked={sizeOption.name === SizePath}
                            name="size"
                            id={sizeOption.id}
                            value={sizeOption.name}
                            className="hidden"
                        />
                        <label
                            onClick={() => setIsClick(!isClick)}
                            htmlFor={sizeOption.id}
                            className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >
                            {sizeOption.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sizes;
