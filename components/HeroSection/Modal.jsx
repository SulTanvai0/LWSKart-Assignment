'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
    const modalRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);



    useEffect(() => {
        setIsMounted(true);
        const modal = modalRef.current;
        if (modal && !modal.open) {
            modal.showModal();
        }
        return () => {
            setIsMounted(false);
        };
    }, []);

    const onHide = () => {
        onClose();
        setIsOpen(false);
    };

    useEffect(() => {
        const modal = modalRef.current;
        if (modal) {
            const handleClose = () => {
                setIsOpen(false);
            };
            modal.addEventListener('close', handleClose);
            return () => {
                modal.removeEventListener('close', handleClose);
            };
        }
    }, [isMounted]);

    if (!isMounted || !isOpen) return null; // Render nothing if not mounted or not open

    return createPortal(
        <dialog
            ref={modalRef}

            className="custom-dialog bg-dark  shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-5 rounded-md dark:bg-opacity-95 w-[50%]  scrollbar-none"
            role="dialog"
        >
            <span
                onClick={onHide}
                className="sticky top-0 left-0 m-2 cursor-pointer"
                aria-label="Close"
                tabIndex={0} // Make the close button focusable
                role="button" // Explicitly define the role as a button for better accessibility

            >
                <Image src="/assets/xmark.svg" alt="close" width={30} height={30} />
            </span>
            {children}
        </dialog>,
        document.getElementById("modal-root-content")
    );
};

export default Modal;
