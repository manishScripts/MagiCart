
import React from 'react';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import NewLetter from '../components/NewLetter.jsx'
const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      icon: MapPin,
      title: "Store Address",
      details: [
        "123 Shopping Street, Downtown Plaza",
        "New Delhi, Delhi 110001",
        "India"
      ],
    },
    {
      id: 2,
      icon: Phone,
      title: "Phone",
      details: [
        "+91-9876543210",
        "+1-123-456-7890"
      ],
    },
    {
      id: 3,
      icon: Mail,
      title: "Email",
      details: [
        "contact@onecart.com",
        "support@onecart.com"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide">
            CONTACT US
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us for any inquiries or support.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {item.title}
                      </h3>
                      <div className="space-y-1">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="OneCart Office"
                className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Careers Section */}
        <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Text Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                  Careers Page
                </h2>
              </div>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Join our dynamic team and be part of something extraordinary. We're always looking for talented individuals who are passionate about innovation, customer service, and making a difference.
              </p>

              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-fit group">
                <span>Explore Jobs</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Career Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Join Our Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent lg:from-transparent" />
            </div>
          </div>
        </div>
      </div>
      <NewLetter/>
    </div>
  );
};

export default Contact;