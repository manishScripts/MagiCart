import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-wide">
            Subscribe now & get 20% off
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
            className="flex-1 px-6 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-base"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;