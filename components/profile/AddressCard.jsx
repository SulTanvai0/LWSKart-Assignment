"use client"
import { deleteUserAddress } from "@/DataBase/quires";
import Link from "next/link";

const AddressCard = ({ address }) => {

    async function deleteAddress(Id) {
        const deleteReq = await deleteUserAddress(Id)
    }

    return (
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 text-lg">{address.title}</h3>
                <Link href={`/addressBook?id=${address?._id}`} className="text-primary">Edit</Link>
            </div>
            <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">Name :{address.name}</h4>
                <p className="text-gray-800">Street: {address?.street}</p>
                <p className="text-gray-800"> city: {address?.city}</p>
                <p className="text-gray-800">state: {address?.state}</p>
                <p className="text-gray-800">zip: {address?.zip}</p>
                <p className="text-gray-800">Phone: {address.phone}</p>
                <button className="text-primary mt-4" onClick={() => deleteAddress(address?._id)}>Delete</button>
            </div>
        </div>
    );
};

export default AddressCard;

