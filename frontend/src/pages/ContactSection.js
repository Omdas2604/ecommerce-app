import React, { useState } from 'react';

// Reusable component for contact information items
const ContactInfoItem = ({ icon, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#FE7743] text-white">
                {icon}
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-base text-gray-600">{children}</p>
        </div>
    </div>
);


export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset status after a few seconds
        setTimeout(() => setStatus(''), 5000);
    };


    return (
        <div className="bg-white" id="contact">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="divide-y-2 divide-gray-200">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        {/* Contact Information */}
                        <div className="space-y-8">
                             <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">Get in touch</h2>
                                <p className="mt-4 text-lg text-gray-600">
                                    Have a question or a comment? We’d love to hear from you. Fill out the form or use the contact details below.
                                </p>
                            </div>
                            <ContactInfoItem
                                title="Visit us"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                            >
                                Baripada,Mayurbhanj,Odisha,757001
                            </ContactInfoItem>
                            <ContactInfoItem
                                title="Email us"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            >
                                <a href="mailto:support@nexus.com" className="hover:text-[#FE7743]">support@nexus.com</a>
                            </ContactInfoItem>
                        </div>

                        {/* Contact Form */}
                        <div className="mt-12 lg:mt-0 lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[#FE7743] focus:border-[#FE7743] border-gray-300 rounded-md"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[#FE7743] focus:border-[#FE7743] border-gray-300 rounded-md"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[#FE7743] focus:border-[#FE7743] border border-gray-300 rounded-md"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#FE7743] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE7743] disabled:opacity-50"
                                    >
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                {status === 'success' && <p className="text-center text-green-600">Thank you! Your message has been sent.</p>}
                                {status === 'error' && <p className="text-center text-red-600">Something went wrong. Please try again.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
