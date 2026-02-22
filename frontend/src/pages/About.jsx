import React from 'react';
import { Award, Zap, HeartHandshake } from 'lucide-react';
import Title from '../components/Title.jsx';    
import NewLetter from '../components/NewLetter.jsx'
const AboutUs = () => {
  const features = [
    {
      id: 1,
      icon: Award,
      title: "Quality Assurance",
      description: "We prioritize quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.",
    },
    {
      id: 2,
      icon: Zap,
      title: "Convenience",
      description: "Shop easily from home with fast delivery, simple navigation, secure checkout, and hassle-free returns in one place.",
    },
    {
      id: 3,
      icon: HeartHandshake,
      title: "Exceptional Customer Service",
      description: "Our dedicated support team ensures quick responses and solutions, making your shopping experience easy and stress-free every time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      {/* About Us Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Title text1={"About"} text2={"Us"} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image/Promo Card */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                  alt="MagiCart Shopping"
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* 30% OFF Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">30%</div>
                    <div className="text-xs font-medium">OFF</div>
                  </div>
                </div>
                {/* Brand Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-6">
                  <h3 className="text-white text-2xl font-semibold mb-1">MAGICART</h3>
                  <p className="text-gray-200 text-sm">INTERFACE FOR BUSINESS</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  MagiCart balances simple, seamless shopping—created to deliver fast, stylish, affordable, and everyday essentials. We combine cutting-edge technology and great value. OneCart makes your online shopping simple, enjoyable, and stress-free.
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  Modern shoppers—combining style, convenience, and a smooth shopping experience. Whether it's fashion, electronics, or home essentials, our curated selection ensures everything you need in one trusted platform with fast delivery and easy returns.
                </p>
              </div>

              {/* Our Mission */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers to the best products at competitive prices, customer-focused experience that cares little adds value, not for every brand and seller.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 text-center mb-16 tracking-wide">
            WHY CHOOSE US
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <NewLetter/>
    </div>
  );
};

export default AboutUs;