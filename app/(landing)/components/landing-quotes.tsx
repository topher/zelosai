"use client";
import React from "react";
import testimonials from "@/app/(landing)/components/Testimonials/testimonials.json";
import ScrollAnimationWrapper from "@/app/(landing)/components/ScrollAnimationWrapper";

export const LandingQuotes = () => {
  // Duplicate testimonials to create a seamless loop
  const totalTestimonials = [...testimonials, ...testimonials];

  return (
    <ScrollAnimationWrapper>
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
              className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 w-96 sm:w-96 md:w-96 lg:w-96 xl:w-96 mx-4 flex-shrink-0 flex flex-col justify-between shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-900 hover:to-purple-900"
            >
              <div>
                <p className="text-xl text-white mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
              <div>
                <p className="text-lg text-indigo-400 font-bold">
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

          .animate-marquee:hover .bg-gradient-to-r {
            animation: hoverEffect 10s infinite alternate;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          /* Parallax hover effect */
          .bg-gradient-to-r:hover {
            transform: perspective(1000px) rotateY(10deg) translateZ(10px);
          }

          /* Glowing drop shadow */
          .bg-gradient-to-r {
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.5s ease;
          }

          .bg-gradient-to-r:hover {
            box-shadow: 0px 4px 20px rgba(100, 100, 255, 0.5);
          }

          @keyframes hoverEffect {
            0% {
              background-position: 0%;
            }
            100% {
              background-position: 100%;
            }
          }
        `}</style>
      </div>
    </ScrollAnimationWrapper>
  );
};
