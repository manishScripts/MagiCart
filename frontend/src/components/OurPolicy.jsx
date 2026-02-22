import { RefreshCw, ShieldCheck, Headphones } from 'lucide-react';
import Title from './Title';

const OurPolicy = () => {
  const policies = [
    {
      id: 1,
      icon: RefreshCw,
      title: "Easy Exchange Policy",
      description: "Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "7 Days Return Policy",
      description: "Shop with Confidence – 7 Days Easy Return Guarantee.",
    },
    {
      id: 3,
      icon: Headphones,
      title: "Best Customer Support",
      description: "Trusted Customer Support – Your Satisfaction Is Our Priority.",
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Title text1="Our" text2="Policy" />
          <p className="text-gray-600 text-base md:text-lg font-light max-w-3xl mx-auto">
            Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {policies.map((policy, index) => {
            const IconComponent = policy.icon;
            return (
              <div
                key={policy.id}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Icon background circle */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-full group-hover:scale-110 transition-transform duration-500">
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                    {policy.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OurPolicy;