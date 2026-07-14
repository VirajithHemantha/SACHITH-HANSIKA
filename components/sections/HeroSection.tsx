'use client';

import { useInView } from 'react-intersection-observer';

export default function HeroSection() {
  const { ref } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-secondary"
    >
      <div
        className="absolute inset-0 bg-cover sm:bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/ChatGPT Image Jul 15, 2026, 04_43_53 AM.png")' }}
      />
    </section>
  );
}
