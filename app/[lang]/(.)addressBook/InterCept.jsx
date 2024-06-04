"use client"
import Modal from "@/components/HeroSection/Modal";
import AddAddressForm from "@/components/profile/AddAddressForm";

import { useRouter } from "next/navigation";

const InterCept = ({ user }) => {
    const router = useRouter();

    function onClose() {
        router.back();
    }
    return (

        <>
            <Modal onClose={onClose}>
                <AddAddressForm onClose={onClose} userId={user?._id} />
            </Modal>
        </>
    );
};

export default InterCept;