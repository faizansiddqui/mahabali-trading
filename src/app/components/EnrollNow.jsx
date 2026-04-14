import React from 'react';
import { TrendingUp, Award, BookOpen, Target, BarChart3, Users, ArrowRight, Shield, GraduationCap, Video, Clock } from 'lucide-react';

export default function EnrollNowSection() {
  const course = {
    title: 'Technical Analysis Mastery',
    originalPrice: '₹1,000',
    discountedPrice: '₹99',
    duration: '4 Weeks',
    icon: <TrendingUp className="w-16 h-16 text-black" />,
    bgColor: 'bg-[#C5FF00]'
  };

  const keyFeatures = [
    {
      icon: <GraduationCap className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Expert-Led Curriculum',
      description: 'Learn from certified trading professionals with 10+ years of market experience.'
    },
    {
      icon: <Video className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Live Interactive Sessions',
      description: 'Join real-time classes with Q&A and personalized feedback sessions.'
    },
    {
      icon: <Shield className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Risk-Free Guarantee',
      description: '100% money-back guarantee if not satisfied within 7 days of enrollment.'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Flexible Learning Schedule',
      description: 'Access recorded sessions anytime, anywhere, with lifetime access to materials.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Certification on Completion',
      description: 'Earn industry-recognized certificates to boost your trading credentials.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#C5FF00]" />,
      title: 'Community Support',
      description: 'Join a private community of 25K+ traders for ongoing discussions and networking.'
    }
  ];

  return (
    <div id="join" className="relative bg-[#0a0a0a] text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5FF00]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#C5FF00]/3 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto">

        {/* Hero Enroll Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C5FF00]/10 border border-[#C5FF00]/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#C5FF00] animate-pulse"></div>
            <span className="text-[#C5FF00] text-sm font-semibold tracking-wide uppercase">Limited Time Offer</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Enroll in Premium Trading</span>
            <span className="bg-gradient-to-r from-[#C5FF00] via-[#d4ff33] to-[#C5FF00] bg-clip-text text-transparent block">
              Courses Now
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Unlock professional trading skills with our expert-guided courses. 
            Limited spots available at unbeatable prices!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-[#C5FF00] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d4ff33] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,255,0,0.4)] tracking-wide flex items-center gap-3">
              Enroll Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-[#C5FF00]/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#C5FF00]/10 hover:border-[#C5FF00]/50 transition-all hover:scale-105 tracking-wide">
              View All Courses
            </button>
          </div>
        </div>

        {/* Single Full-Width Course Card */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Course - Limited Offer</h2>
          <div className="relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#C5FF00]/20 rounded-3xl p-6 md:p-8 lg:p-12 overflow-hidden group">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C5FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              90% OFF
            </div>

            {/* Course Header */}
            <div className="text-center mb-8 md:mb-12">
              <div className={`${course.bgColor} p-6 md:p-8 rounded-3xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform`}>
                {course.icon}
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{course.title}</h3>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <Video className="w-5 h-5 md:w-6 md:h-6 text-[#C5FF00]" />
                <span className="text-lg md:text-xl text-gray-300 font-medium">{course.duration}</span>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <span className="text-4xl md:text-5xl font-bold text-[#C5FF00]">{course.discountedPrice}</span>
                  <span className="text-xl md:text-2xl line-through text-gray-500">{course.originalPrice}</span>
                </div>
                <p className="text-sm md:text-base text-gray-400 text-center">One-time payment • Lifetime Access</p>
              </div>

              {/* Enroll Button */}
              <button className="w-full max-w-md mx-auto block bg-[#C5FF00] hover:bg-[#d4ff33] text-black font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,255,0,0.4)] tracking-wide text-lg">
                Enroll Now - Secure Your Spot
              </button>
            </div>

            {/* Key Features Integrated Below Course */}
            <div className="pt-8 md:pt-12 border-t border-[#C5FF00]/10">
              <h4 className="text-2xl font-bold text-center mb-8 text-[#C5FF00]">What You&apos;ll Get in This Course</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer hover:scale-105 transition-all"
                  >
                    <div className="flex items-start gap-4 p-4 md:p-6 bg-[#1a1a1a]/30 rounded-2xl border border-[#C5FF00]/20 group-hover:border-[#C5FF00]/40">
                      <div className="bg-[#C5FF00]/10 p-3 md:p-4 rounded-2xl border border-[#C5FF00]/30 group-hover:scale-110 transition-transform flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-lg mb-2 group-hover:text-[#C5FF00] transition-colors">{feature.title}</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#C5FF00]/20 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Trading Skills?</h3>
          <p className="text-gray-400 mb-6">Don&apos;t miss this exclusive offer - enroll today and start your journey to profitable trading!</p>
          <button className="bg-gradient-to-r from-[#C5FF00] via-[#d4ff33] to-[#C5FF00] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(197,255,0,0.4)] transition-all tracking-wide flex items-center gap-3 mx-auto">
            Start Your Enrollment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}