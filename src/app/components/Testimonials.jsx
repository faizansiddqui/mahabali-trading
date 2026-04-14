'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Anuska Sharma',
    role: 'Software Engineer, Bangalore',
    quote: 'This trading course changed my life! From losing money to making consistent profits. The mentors are amazing and explain everything so simply. Highly recommend for beginners like me.',
    rating: 5,
    image: '/testimonialsImg/img1.png'
  },
  {
    name: 'Preeti Kumari',
    role: 'School Teacher, Mumbai',
    quote: 'I was scared of stock market but Trendy Traders made it easy. The live sessions and community support helped me a lot. Now I trade confidently from home. Thank you team!',
    rating: 5,
    image: '/testimonialsImg/img2.jpg'
  },
  {
    name: 'Amit Kumar',
    role: 'Business Owner, Delhi',
    quote: 'Best investment I made! Their strategies work in real markets. I doubled my portfolio in 3 months. The course is worth every penny, especially at this price.',
    rating: 5,
    image: '/testimonialsImg/img3.jpg'
  },
  {
    name: 'Arnav Katiyar',
    role: 'College Student, Pune',
    quote: 'As a student, I needed something affordable and practical. This course gave me both! The modules are short and to the point. Already seeing results in paper trading.',
    rating: 4.9,
    image: '/testimonialsImg/img4.png'
  },
  {
    name: 'Vikram Singh',
    role: 'Retired Professional, Chennai',
    quote: 'At my age, learning new things is tough, but the instructors were patient and clear. Now I manage my savings better. Great for anyone starting late in trading.',
    rating: 5,
    image: '/testimonialsImg/img5.png'
  }
];

export default function TestimonialsSection() {
  return (
    <div id="learn" className="relative bg-[#0a0a0a] text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5FF00]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#C5FF00]/3 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C5FF00]/10 border border-[#C5FF00]/20 mb-8 mx-auto max-w-max">
            <div className="w-2 h-2 rounded-full bg-[#C5FF00] animate-pulse"></div>
            <span className="text-[#C5FF00] text-sm font-semibold tracking-wide uppercase">What Our Students Say</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Stories from <span className="text-[#C5FF00]">Successful Traders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of students who transformed their trading journey with our expert guidance.
          </p>
        </div>

        {/* Swiper Testimonials */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return `<span class="${className} bg-[#C5FF00]/30 border border-[#C5FF00]/50 rounded-full w-3 h-3"></span>`;
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#C5FF00]/20 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between hover:border-[#C5FF00]/40 transition-all group">
                  {/* Quote */}
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center gap-1 mb-3 md:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 md:w-5 h-4 md:h-5 ${i < Math.floor(testimonial.rating) ? 'text-[#C5FF00] fill-[#C5FF00]' : 'text-gray-600'}`}
                        />
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <div className="w-4 md:w-5 h-4 md:h-5 bg-gradient-to-r from-[#C5FF00] to-transparent rounded-full relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#C5FF00] w-[80%] h-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 italic text-base md:text-lg leading-relaxed mb-3 md:mb-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-[#C5FF00]/10">
                    <div className="relative flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#C5FF00]/20 group-hover:border-[#C5FF00]/50 transition-colors"
                      />
                      <div className="absolute -bottom-0.5 md:-bottom-1 -right-0.5 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-[#C5FF00] rounded-full flex items-center justify-center text-black text-xs font-bold">
                        ✓
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm md:text-base truncate">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-gray-400 truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#C5FF00]/10 border border-[#C5FF00]/30 rounded-full flex items-center justify-center text-[#C5FF00] hover:bg-[#C5FF00]/20 transition-all group cursor-pointer">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2  w-10 h-10 md:w-12 md:h-12 bg-[#C5FF00]/10 border border-[#C5FF00]/30 rounded-full flex items-center justify-center text-[#C5FF00] hover:bg-[#C5FF00]/20 transition-all group cursor-pointer">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 pt-12 border-t border-[#C5FF00]/10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#C5FF00] mb-2">25K+</div>
            <p className="text-gray-400 text-sm md:text-base">Happy Students</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#C5FF00] mb-2">98%</div>
            <p className="text-gray-400 text-sm md:text-base">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#C5FF00] mb-2">150+</div>
            <p className="text-gray-400 text-sm md:text-base">Courses Completed</p>
          </div>
        </div>

      </div>
    </div>
  );
}