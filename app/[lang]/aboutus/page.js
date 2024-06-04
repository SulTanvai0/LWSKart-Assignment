import Image from "next/image";

export const metadata = {
  title: "About - LWsKart",
  openGraph: {
    images: [
      {
        url: `https://lws-assignment-m-8.vercel.app/api/og?title=LWsKart - About Us `,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">About LWSKart</h1>
          <p className="text-lg text-gray-600 mt-4">
            Your Ultimate Destination for Quality Furniture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
          <div className="lg:w-1/2">
            <Image
              src="/assets/images/logo.svg"
              width={600}
              height={400}
              alt="LWSKart Showroom"
              className="rounded-md shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, LWSKart has quickly grown into a premier
              furniture destination. We believe that furniture should be more
              than just functional; it should be an expression of your style and
              a reflection of your personality. Our team of designers and
              artisans are dedicated to crafting pieces that are not only
              beautiful but also built to last.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began with a simple idea: to make high-quality,
              stylish furniture accessible to everyone. We source the finest
              materials and employ skilled craftsmen to ensure every piece meets
              our rigorous standards. From our humble beginnings, we have
              expanded to serve customers across the country, offering a wide
              range of furniture for every room in your home.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Why Choose Us
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/icons-svg/quality.svg"
                width={80}
                height={80}
                alt="Quality"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Quality Materials
              </h3>
              <p className="text-gray-600">
                We use only the finest materials to ensure that our furniture is
                durable and long-lasting.
              </p>
            </div>
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/icons-svg/furnitureDesign.svg"
                width={80}
                height={80}
                alt="Design"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Elegant Designs
              </h3>
              <p className="text-gray-600">
                Our pieces are designed to complement any decor and enhance the
                beauty of your home.
              </p>
            </div>
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/icons-svg/service.svg"
                width={80}
                height={80}
                alt="Service"
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Excellent Service
              </h3>
              <p className="text-gray-600">
                We are committed to providing exceptional customer service and
                support.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Our Team
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/assets/images/person.png"
                width={150}
                height={150}
                alt="Team Member 1"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                John Doe
              </h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/assets/images/person.png"
                width={150}
                height={150}
                alt="Team Member 2"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Jane Smith
              </h3>
              <p className="text-gray-600">Lead Designer</p>
            </div>
            <div className="flex-1 text-center p-6 bg-white rounded-md shadow-lg">
              <Image
                src="/assets/images/person.png"
                width={150}
                height={150}
                alt="Team Member 3"
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Michael Brown
              </h3>
              <p className="text-gray-600">Head of Sales</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            Wed love to hear from you! Reach out to us with any questions,
            comments, or feedback.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:info@lwskart.com"
              className="text-primary hover:underline"
            >
              info@lwskart.com
            </a>
            <a href="tel:+1234567890" className="text-primary hover:underline">
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
