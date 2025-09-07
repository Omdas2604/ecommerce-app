import React from "react";
import { Link } from "react-router-dom";

// --- SUB-COMPONENTS FOR THE HOMEPAGE ---

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#FAF7F3]">
    <div className="absolute top-0 left-0 w-full h-full z-10"></div>
    <div className="relative z-20 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
        Where Style Meets Innovation.
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
        Nexus is your connection to a curated world of premium electronics,
        fashion, and lifestyle essentials.
      </p>
      <Link
        to="/products"
        className="mt-8 inline-block bg-[#FE7743] text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Shop the Collection
      </Link>
    </div>
  </section>
);

const CategoriesSection = () => {
  const categories = [
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      link: "/products/tech",
    },
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
      link: "/products/footwear",
    },
    {
      name: "Home",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      link: "/products/apparel",
    },
  ];

  return (
    <section className="py-20  bg-[#FAF7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Find Your Connection
        </h2>
        <div className="mt-12 flex overflow-x-auto gap-8 md:grid md:grid-cols-3 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.name}
              className="group relative block overflow-hidden rounded-lg shadow-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-96 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValuePropositionSection = () => {
  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          ></path>
        </svg>
      ),
      title: "Expert Curation",
      text: "Every item is hand-picked for its quality, design, and durability. We don't sell everything; we sell the right things.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      title: "Seamless Experience",
      text: "From easy browsing to fast, reliable shipping, we connect you with your products faster and without hassle.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 11.945l.223.223a2 2 0 002.828 0l.945-.945a2 2 0 012.828 0l.223.223M12 21a9 9 0 100-18 9 9 0 000 18z"
          ></path>
        </svg>
      ),
      title: "Global & Local",
      text: "We source the best products from around the world and right here in India, bringing you a unique and diverse collection.",
    },
  ];

  return (
    <section className="py-20 bg-[#FAF7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          The Nexus Difference
        </h2>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center">
              <div className="bg-[#FE7743] p-4 rounded-full">{value.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-black">
                {value.title}
              </h3>
              <p className="mt-2 text-gray-400">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = () => (
  <section className="py-20 bg-[#FAF7F3]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-black">
        Ready to Get Connected?
      </h2>
      <p className="mt-4 text-lg text-gray-400">
        Explore our full collection and discover your next favorite thing.
      </p>
      <Link
        to="/products"
        className="mt-8 inline-block bg-[#F37743] text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Explore All Products
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#FAF7F3] text-black">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p>&copy; 2025 Nexus. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- THE MAIN HOMEPAGE COMPONENT ---
const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <ValuePropositionSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default HomePage;
