import React from 'react';
import { Link } from 'react-router-dom';

// Reusable icon component for the "Our Values" section
const ValueCard = ({ icon, title, children }) => (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FEF2EE]">
            {icon}
        </div>
        <h3 className="mt-5 text-lg font-medium tracking-tight text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{children}</p>
    </div>
);

export default function AboutPage() {
    return (
        <div className="bg-[#FAF7F3] pt-5">
            <main>
                {/* Hero Section */}
                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#FAF7F3]" />
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                            <div className="absolute inset-0">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
                                    alt="People working on laptops"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FE7743] to-[#f89b74] mix-blend-multiply" />
                            </div>
                            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                    <span className="block text-white">Connecting You to a</span>
                                    <span className="block text-orange-200">Better Way of Shopping</span>
                                </h1>
                                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-orange-100 sm:max-w-3xl">
                                    We believe shopping should be simple, intentional, and inspiring. Nexus was born from a desire to cut through the noise and connect you directly with quality products that enhance your life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="bg-[#FAF7F3] py-24 sm:py-32">
                    <div className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-base font-semibold text-[#FE7743] tracking-wide uppercase">Our Story</h2>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">The Heart of Nexus</p>
                        <p className="mt-8 text-lg text-gray-600">
                            In a world saturated with endless options, finding products that are well-made and genuinely useful can be overwhelming. We started Nexus to solve this problem. Our journey began with a simple question: "What if we could create a single point of connection—a nexus—for thoughtfully designed goods?" We are a team of curators, designers, and tech enthusiasts dedicated to finding and showcasing products that blend form, function, and lasting value.
                        </p>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="bg-white py-24 sm:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base font-semibold text-[#FE7743] tracking-wide uppercase">Our Values</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">The Principles That Guide Us</p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <ValueCard
                                title="Expert Curation"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE7743]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            >
                                We don't sell everything; we sell the right things. Every product is hand-picked for its quality and purpose.
                            </ValueCard>
                            <ValueCard
                                title="Customer-First Approach"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE7743]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                            >
                                Your experience is our top priority. We provide a seamless journey from browsing to unboxing.
                            </ValueCard>
                             <ValueCard
                                title="Commitment to Quality"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE7743]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                            >
                                We partner with brands that share our passion for craftsmanship and durable, long-lasting products.
                            </ValueCard>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white">
                    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">Ready to find your next favorite?</span>
                            <span className="block bg-gradient-to-r from-[#FE7743] to-[#f89b74] bg-clip-text text-transparent -mt-1 pb-1">Explore our collection today.</span>
                        </h2>
                        <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                            <Link to="/products" className="flex items-center justify-center bg-[#FE7743] px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:opacity-90">
                                Shop Now
                            </Link>
                            <Link to="/contact" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[#FE7743] bg-orange-50 hover:bg-orange-100">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

