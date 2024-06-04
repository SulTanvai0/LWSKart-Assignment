"use client"
import Modal from "@/components/HeroSection/Modal";
import AddPaymentMethodForm from "@/components/Payment/AddPaymentMethodForm";
import { useRouter } from "next/navigation";

const InterCept = ({ user }) => {
    const router = useRouter();

    function onClose() {
        router.back();
    }

    return (
        <Modal onClose={onClose}>
            <div className="p-10">
                <AddPaymentMethodForm onClose={onClose} userId={user?._id} />
            </div>
        </Modal>
    );
};

export default InterCept;
