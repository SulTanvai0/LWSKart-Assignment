import { useEffect, useRef, useState } from 'react';

export const AccordionChilde = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div className="border-b border-gray-300 shadow-orange-500 my-2">
            <button
                className="w-full py-4 text-left bg-white p-2 flex justify-between items-center"
                onClick={toggleAccordion}
            >
                <span className=" text-gray-800 font-bold">{title}</span>
                <span className="text-gray-600">{isOpen ? '∧' : '∨'}</span>
            </button>
            <div
                ref={contentRef}
                className="transition-max-height duration-500 ease-in-out overflow-auto invisible-scrollbar  "
                style={{
                    maxHeight: maxHeight,
                }}
            >

                {children}

            </div>
        </div>
    );
};

export default AccordionChilde;