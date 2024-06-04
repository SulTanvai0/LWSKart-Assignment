"use client"
import Categories from "./Categories";
import Price from "./Price";
import Sizes from "./Sizes";

const Filters = ({ names }) => {


    return (

        <div className="divide-y divide-gray-200 space-y-5">
            <Categories names={{ categories: names?.sidebar?.categories, category: names?.category }} />

            <Price name={names?.sidebar?.price} />

            <Sizes name={names?.sidebar?.filter} />
        </div>


    );
};

export default Filters; 