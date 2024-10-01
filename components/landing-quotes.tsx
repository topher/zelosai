"use client";
import React from "react";
import testimonials from "@/app/(landing)/components/Testimonials/testimonials.json";

export const LandingQuotes = () => {
  // Duplicate testimonials to create a seamless loop
  const totalTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="bg-gray-900 text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Section Header and Description */}
      <h2 className="text-6xl text-center font-extrabold mb-12">
        What Our Clients Say
      </h2>
      <p className="text-center text-xl text-gray-400 mb-16 max-w-4xl mx-auto">
        Hear from athletes and entrepreneurs who have taken their brands to the next level with Zelos.
      </p>

      {/* Testimonials Marquee */}
      <div className="flex items-stretch animate-marquee">
        {totalTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 w-96 mx-4 flex-shrink-0 flex flex-col justify-between"
          >
            <div>
              <p className="text-xl text-white mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
            <div>
              <p className="text-lg text-indigo-500 font-bold">
                {testimonial.name}
              </p>
              <ul className="text-sm text-gray-400">
                {testimonial.accolades.map((accolade, idx) => (
                  <li key={idx}>{accolade}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          flex-wrap: nowrap;
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
