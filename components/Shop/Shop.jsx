'use client'
import urlProvider from "@/utils/urlProvider";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LoadingSvg from "../LoadingSvg";
import ClientCard from "../shared/Card/CLientCard";
import Drawer from "./sideBar/Drawer";
import Filters from "./sideBar/Filters";

const Shop = ({ user, names }) => {
    const [paginationData, setPaginationData] = useState({
        data: [],
        page: 1,
        hasMore: true
    });
    const trackLoaderRef = useRef(null);
    const searchParams = useSearchParams();

    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const size = searchParams.get('size');
    const query = searchParams.get('query');
    const limit = 10;

    const url = useMemo(() => urlProvider({ category, min, max, size, limit, page: paginationData.page, query }), [category, min, max, size, limit, paginationData.page, query]);



    useEffect(() => {
        setPaginationData({
            data: [],
            page: 1,
            hasMore: true
        });
    }, [category, min, max, size, query]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const result = await res.json();


            setPaginationData((prev) => ({
                ...prev,
                data: [...prev.data, ...result.data],
                page: prev.page + 1,
                hasMore: result.data.length === limit
            }));
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, [url, limit]);

    useEffect(() => {
        const onIntersection = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && paginationData.hasMore) {
                fetchData();
            }
        };

        const observer = new IntersectionObserver(onIntersection);

        if (trackLoaderRef.current) {
            observer.observe(trackLoaderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [paginationData.hasMore, fetchData]);


    return (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <Drawer names={names} />
            <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
                <Filters names={names} />
            </div>
            <div className="col-span-3 overflow-auto h-[600px] invisible-scrollbar">
                {paginationData.data.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  justify-items-center ">
                        {paginationData.data.map((Product) => (
                            <ClientCard key={Product?._id} user={user} Product={Product} />
                        ))}
                    </div>
                )}
                {paginationData.hasMore ? (
                    <div ref={trackLoaderRef} className="flex justify-center"><LoadingSvg /></div>
                ) : (
                    <div className="text-center m-5">
                        {paginationData.data.length === 0 ? `No Data Found On: ${decodeURI(category)}` : `All data loaded`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
