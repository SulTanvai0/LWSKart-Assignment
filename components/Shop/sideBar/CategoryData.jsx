"use client"
import { useEffect, useState } from "react";

const CategoryData = ({ category }) => {


    const [length, setLength] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await `${process.env.NEXT_PUBLIC_LWSKART_API_URl}/getDataBySearchParams?page=1&limit=100&category=${category}`

                const req = await fetch(url, { next: { tags: ["countCategoryData"] } });
                const res = await req.json();


                if (res.status === 200) {
                    setLength(res?.data?.length);
                } else {
                    console.error('Error fetching data:', res.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="ml-auto text-gray-600 text-sm">({length})</div>
    );
};

export default CategoryData;
