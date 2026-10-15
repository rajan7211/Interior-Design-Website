import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../ui/Motion';

export const NewsletterBannerSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-400px)] flex flex-col justify-center py-20 sm:py-28 lg:py-32 overflow-hidden bg-neutral-900 text-white text-center">
      {/* Background Boucle Shell Chair Photo (Matching Image 4) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2400&q=85"
          alt="Sculptural Armchair in Morning Sunlight"
          className="w-full h-full object-cover"
        />
        {/* Warm ambient filter */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <FadeIn direction="up">
          <div className="space-y-3.5">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
              Join Our Home Decor Circle to Stay Inspired
            </h2>

            <p className="text-xs sm:text-sm font-sans text-white/90 leading-relaxed font-normal max-w-lg mx-auto">
              Insights, trends, and design inspiration to help you create stylish, functional, and effortless living spaces.
            </p>
          </div>
        </FadeIn>

        {submitted ? (
          <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-[#E05A2B] px-6 py-3 rounded-full text-xs text-white">
            <CheckCircle2 className="w-4 h-4 text-[#E05A2B]" />
            <span>Welcome to our private design circle. Check your inbox soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-3.5 max-w-md mx-auto">
            <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full p-1.5 shadow-2xl border border-white/60">
              <div className="pl-3.5 pr-2 text-neutral-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full bg-transparent text-xs text-black placeholder:text-neutral-400 outline-none font-medium"
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-[#111111] hover:bg-[#E05A2B] text-white transition-colors"
                aria-label="Submit Email"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

