/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import CategoryData from './CategoryData';

const productCategory = ["BedRoom", "Mattress", "Outdoor", "Sofa", "Living Room", "Kitchen"];



const Categories = ({ names }) => {
    const [query, setQuery] = useState([]);
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const { category } = names;

    const categories = [
        { id: "01", name: category.BedRoom, link: "BedRoom" },
        { id: "02", name: category.Mattress, link: "Mattress" },
        { id: "03", name: category.Outdoor, link: "Outdoor" },
        { id: "04", name: category.Sofa, link: "Sofa" },
        { id: "05", name: category.LivingRoom, link: "Living Room" },
        { id: "06", name: category.Kitchen, link: "Kitchen" },
    ];

    const handleChange = (event) => {

        event.preventDefault();
        const name = event.target.name;
        const checked = event.target.checked;

        if (checked) {
            setQuery([name]);
        } else {
            const filtered = query.filter(item => item !== name);
            setQuery(filtered);
        }

    }

    useEffect(() => {
        const category = params.get('category');

        if (category) {
            const decodedCategory = decodeURI(category);
            const queryInCategory = decodedCategory.split('|');
            setQuery(queryInCategory);
        }

    }, []);

    useEffect(() => {
        if (query.length > 0) {
            params.set('category', encodeURI(query.join('|')))
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`)
    }, [params, pathname, query, replace])


    return (
        <div>
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">{names?.categories}</h3>
            <div className="space-y-2">
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                        <input
                            type="checkbox"
                            onChange={handleChange}
                            checked={query.includes(category.link)}
                            name={category.link}
                            id={category.id}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        />
                        <label htmlFor={category.name} className="text-gray-600 ml-3 cursor-pointer">{category.name}</label>
                        <CategoryData category={category.link} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;