"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfileInfo = ({ user }) => {
    const { name, image, email, fullName } = user;
    const userImgRef = useRef();

    const imageString = image?.split("=");
    const newImage = image && `${imageString[0]}=s1900-c`;

    const [profileImage, setProfileImage] = useState(newImage);

    const handleImageUpload = (e) => {
        e.preventDefault();
        userImgRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const file of userImgRef.current.files) {
            formData.append("image", file);
        }
        formData.append("userId", user._id);

        try {
            const response = await fetch("/api/updateUserImage", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Profile photo updated successfully");
                setProfileImage(result.imageUrl);
            } else {
                console.error(result.error);
                toast.error("Failed to update profile photo");
            }
        } catch (error) {
            console.error("An error occurred while uploading the image:", error);
            toast.error("An error occurred while uploading the image");
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-8 h-44 w-44 lg:h-56 lg:w-56">
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full overflow-hidden">
                    {profileImage ? (
                        <Image
                            src={profileImage}
                            className="object-cover"
                            alt={name}
                            width={280}
                            height={280}
                        />
                    ) : (
                        <Image
                            src="/assets/images/person.png"
                            className="object-cover"
                            alt={name}
                            width={280}
                            height={280}
                        />
                    )}
                </div>
                <button
                    onClick={handleImageUpload}
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                >
                    <Image src="/assets/images/icons/add_photo.svg" alt="Edit" width={20} height={20} />
                </button>
                <input
                    id="file"
                    type="file"
                    ref={userImgRef}
                    hidden
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-gray-800 lg:text-3xl">{name || fullName}</h3>
                <p className="leading-6 text-gray-600 lg:text-lg">{email}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
