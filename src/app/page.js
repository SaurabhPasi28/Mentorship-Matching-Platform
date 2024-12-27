import Link from "next/link";
// import CloudinaryUpload from "./components/CloudinaryUpload";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      {/* <CloudinaryUpload/> */}
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-xl mb-6">Discover, connect, and grow with like-minded professionals.</p>
        <Link href="/discover" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          Explore Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Connect with Professionals</h3>
              <p className="text-gray-600">
                Easily find and connect with professionals who share your interests and expertise.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get recommendations based on your skills, interests, and career goals.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Grow Your Network</h3>
              <p className="text-gray-600">
                Expand your network with just a few clicks, making connections easier than ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-6">What Our Users Say</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 italic">&quot;This platform has completely changed the way I network and collaborate with other professionals.&quot;</p>
              <p className="mt-4 font-semibold text-indigo-600">Saurabh</p>
              <p className="text-gray-500">Software Engineer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 italic">&quot;I&apos;ve connected with so many amazing people, and the recommendations are spot on!&quot;</p>
              <p className="mt-4 font-semibold text-indigo-600">Vishakha</p>
              <p className="text-gray-500">Product Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
        <p className="text-xl mb-6">Sign up today and start your journey with us!</p>
        <Link href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          Get Started
        </Link>
      </section>
    </div>
  );
}
