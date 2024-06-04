import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">
        Oops! This page was not found.
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        The requested resource could not be found.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
