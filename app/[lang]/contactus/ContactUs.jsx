"use client";
import { sendEmail } from "@/DataBase/quires/sendEmail";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const htmlBody = `
        <p>Name: ${formData.name}</p>
        <p>Email: ${formData.email}</p>
        <p>Message: Thank you for your message! Our agent will reach out to you soon.</p>
    `;
        const subject = "Contact Us Message";

        toast.promise(
            fetch("/api/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(async (response) => {
                if (response.ok) {
                    await sendEmail(
                        formData.email,
                        htmlBody,
                        subject,
                        "Thank you for your message! We'll get back to you soon."
                    );
                    setSubmitted(true);
                    setFormData({ name: "", email: "", message: "" });
                } else {
                    throw new Error("Failed to submit form");
                }
            }),
            {
                loading: "Submitting your message...",
                success: "Message submitted successfully!",
                error: "Failed to submit your message.",
            }
        ).catch((error) => {
            console.error("Error submitting form:", error);
        });
    };

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-primary mb-8">
                    Contact Us
                </h1>

                <div className="flex flex-wrap -mx-4">
                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                        <div className="bg-white p-8 rounded shadow-md">
                            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                            {submitted && (
                                <p className="text-green-500 mb-4">
                                    Thank you for your message! Well get back to you soon.
                                </p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                        rows="5"
                                        placeholder="Your Message"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primary text-white py-3 px-6 rounded hover:bg-secondary transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="w-full lg:w-1/3 px-4">
                        <div className="bg-white p-8 rounded shadow-md">
                            <h2 className="text-2xl font-semibold mb-6">
                                Contact Information
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Feel free to reach out to us using the following contact
                                details:
                            </p>
                            <ul className="text-gray-700 mb-6">
                                <li className="mb-2">
                                    <i className="fa-solid fa-phone mr-2"></i>
                                    Phone: (123) 456-7890
                                </li>
                                <li className="mb-2">
                                    <i className="fa-solid fa-envelope mr-2"></i>
                                    Email: contact@lwskart.com
                                </li>
                                <li className="mb-2">
                                    <i className="fa-solid fa-map-marker-alt mr-2"></i>
                                    Address: 1234 Furniture Street, Suite 100, City, Country
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <Link
                                    href="https://facebook.com"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Image
                                        src="/social-svg/facebook.svg"
                                        width={28}
                                        height={14}
                                        alt="Logo"
                                    />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    className="text-blue-400 hover:text-blue-600"
                                >
                                    <Image
                                        src="/social-svg/x.svg"
                                        width={28}
                                        height={14}
                                        alt="Logo"
                                    />
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    className="text-pink-600 hover:text-pink-800"
                                >
                                    <Image
                                        src="/social-svg/instagram.svg"
                                        width={28}
                                        height={14}
                                        alt="Logo"
                                    />
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    <Image
                                        src="/social-svg/linkedin.svg"
                                        width={28}
                                        height={14}
                                        alt="Logo"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Our Location
                    </h2>
                    <div className="w-full h-96 rounded shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.95373631531562!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727e34322988c3!2s1234%20Furniture%20St%2C%20City%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1627379269142!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className="border-0 rounded"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
