'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface EnvelopeOpenerProps {
  onEnvelopeOpen: () => void;
}

export function EnvelopeOpener({ onEnvelopeOpen }: EnvelopeOpenerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const prefix = searchParams.get('p') || '';
  const guestName = searchParams.get('n') || '';
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnvelopeClick = () => {
    if (isAnimating || isOpen) return;

    setIsAnimating(true);
    setIsOpen(true);

    setTimeout(() => {
      setShowContent(true);
      onEnvelopeOpen();
    }, 5500);
  };

  const petals = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2.5,
    duration: 10 + Math.random() * 8,
    scale: 0.5 + Math.random() * 0.9,
    drift: Math.random() * 120 - 60,
  }));

  const sparkles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <AnimatePresence mode="wait">
      {!showContent && (
        <motion.section
          key="envelope-section"
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.9, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(174,146,93,0.12),transparent_35%),linear-gradient(135deg,#FAF6F0_0%,#DDB2A2_50%,#AC8E73_100%)]" />

          {/* Soft ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.8, 1, 0.85],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-[-12rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-secondary/[0.07] blur-3xl" />
          </motion.div>

          {/* Spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.4, 0.6, 0.45],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute left-1/2 top-0 h-[40rem] w-[24rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,240,200,0.16),rgba(255,240,200,0.04)_35%,transparent_72%)] blur-2xl" />
          </motion.div>

          {/* Christian-inspired geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20px 20px, rgba(174,146,93,0.35) 1.2px, transparent 1.2px),
                  linear-gradient(rgba(174,146,93,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(174,146,93,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px, 80px 80px, 80px 80px',
                backgroundPosition: '0 0, 0 0, 0 0',
              }}
            />
          </div>

          {/* Top and bottom ornamental fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/30 to-transparent" />

          {/* Gold ceremonial rings */}
          <motion.div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full border border-secondary/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full border border-secondary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {sparkles.map((item) => (
              <motion.span
                key={item.id}
                className="absolute h-1 w-1 rounded-full bg-secondary"
                style={{ left: item.left, top: item.top }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Floating lotus petals */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute top-[-10%]"
                style={{ left: petal.left }}
                animate={{
                  y: ['0vh', '115vh'],
                  x: [0, petal.drift, petal.drift * -0.35],
                  rotate: [0, 120, 240],
                  opacity: [0, 0.8, 0.65, 0],
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="h-5 w-3 rounded-full bg-gradient-to-b from-[#FAF6F0] via-[#DDB2A2] to-[#B77F74] shadow-md shadow-foreground/20"
                  style={{
                    transform: `scale(${petal.scale}) rotate(18deg)`,
                    borderRadius: '70% 30% 70% 30% / 70% 30% 70% 30%',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.75%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")',
            }}
          />

          {/* Main content */}
          <div className="relative z-20 flex min-h-[100dvh] flex-col items-center justify-center px-6 -mt-16 sm:-mt-8">
            {/* Intro label */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="mb-8 text-center"
            >
              <div className="mb-3 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#AE925D]/70" />
                <p className="text-[10px] uppercase tracking-[0.45em] text-primary/80">
                  A Wedding Invitation
                </p>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#AE925D]/70" />
              </div>
              {guestName ? (
                <div className="mt-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium">
                    We cordially invite
                  </p>
                  <p className="text-[16px] uppercase tracking-[0.1em] text-primary font-bold mt-1">
                    {prefix} {guestName}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] tracking-[0.24em] text-primary/70">
                  Unveil the moment
                </p>
              )}
            </motion.div>

            {/* Envelope stage */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8 -z-20 rounded-[3rem] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(174,146,93,0.0),rgba(174,146,93,0.2),rgba(174,146,93,0.0),rgba(174,146,93,0.18),rgba(174,146,93,0.0))] blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />

              {/* Outer aura */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-[2.5rem] bg-secondary/10 blur-3xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.55, 0.8, 0.55],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Decorative frame */}
              <div className="absolute -inset-6 rounded-[2rem] border border-secondary/15" />
              <div className="absolute -inset-3 rounded-[1.6rem] border border-secondary/10" />

              <motion.button
                type="button"
                onClick={handleEnvelopeClick}
                whileHover={!isOpen ? { scale: 1.015, y: -4 } : {}}
                whileTap={!isOpen ? { scale: 0.995 } : {}}
                className="group relative block cursor-pointer isolate"
              >
                <div className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-secondary/40 opacity-60" />

                {/* Envelope body */}
                <motion.div
                  animate={isOpen ? { y: 56, opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="relative h-[260px] w-[420px] overflow-hidden rounded-[28px] border border-secondary/25 bg-[linear-gradient(180deg,rgba(250,246,240,0.95)_0%,rgba(255,255,255,0.98)_100%)] shadow-md shadow-foreground/20"
                >
                  {/* Inner texture */}
                  <div className="absolute inset-0 opacity-[0.08]">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at center, rgba(174,146,93,0.25) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px',
                      }}
                    />
                  </div>

                  {/* Premium foil layers for closed-envelope look */}
                  <div className="pointer-events-none absolute inset-[8px] rounded-[22px] border border-secondary/40" />
                  <div className="pointer-events-none absolute inset-[14px] rounded-[18px] border border-secondary/20" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(128deg,rgba(255,255,255,0.26)_0%,transparent_36%,transparent_64%,rgba(255,255,255,0.2)_100%)]" />

                  {!isOpen && (
                    <>
                      <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 rounded-lg border border-secondary/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.5),rgba(174,146,93,0.15))]" />
                      <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 rounded-lg border border-secondary/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.5),rgba(174,146,93,0.15))]" />
                      <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 rounded-lg border border-secondary/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.5),rgba(174,146,93,0.15))]" />
                      <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 rounded-lg border border-secondary/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.5),rgba(174,146,93,0.15))]" />
                    </>
                  )}

                  {/* Top flap */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
                    transition={{
                      duration: 1.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-0 top-0 h-[54%] w-full origin-top"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1600px',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#AE925D_0%,#AC8E73_38%,#B77F74_100%)] shadow-md shadow-foreground/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_45%)]" />

                    {/* Flap ornament */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-[72px] w-[72px] -translate-y-8 items-center justify-center rounded-full border-[1px] border-[#FAF6F0]/40 relative">
                        <div className="absolute inset-1 border-[0.5px] border-[#FAF6F0]/25 rounded-full" />
                        <span className="font-serif text-2xl text-[#FAF6F0]/90 drop-shadow-md">SH</span>
                      </div>
                    </div>

                    {!isOpen && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                        className="pointer-events-none absolute inset-0 m-auto h-20 w-20 rounded-full border border-background/25"
                      />
                    )}
                  </motion.div>

                  {/* Side folds */}
                  <div
                    className="absolute bottom-0 left-0 h-[62%] w-1/2 bg-[linear-gradient(135deg,rgba(174,146,93,0.12),rgba(255,255,255,0.55))]"
                    style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
                  />
                  <div
                    className="absolute bottom-0 right-0 h-[62%] w-1/2 bg-[linear-gradient(225deg,rgba(174,146,93,0.12),rgba(255,255,255,0.55))]"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                  />

                  {/* Bottom section */}
                  <div className="absolute inset-x-0 bottom-0 flex h-[58%] flex-col items-center justify-end px-8 pb-4 sm:pb-6 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={!isOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="translate-y-4"
                    >
                      <div className="font-serif text-xl tracking-[0.1em] text-secondary">
                        <span>SACHITH</span>
                        <span className="mx-2 italic">&</span>
                        <span>HANSIKA</span>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-secondary/50" />
                        <span className="text-primary">✦</span>
                        <span className="h-px w-10 bg-secondary/50" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Wax seal */}
                  <motion.div
                    animate={!isOpen ? { scale: [1, 1.05, 1] } : { scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 2.8,
                      repeat: !isOpen ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    className="absolute left-1/2 top-[54%] z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/40 bg-[radial-gradient(circle_at_30%_30%,#B77F74_0%,#74472D_55%,#53301D_100%)] shadow-md shadow-foreground/20"
                  >
                    <span className="font-serif text-lg text-[#FAF6F0] drop-shadow-sm">S ✦ H</span>
                  </motion.div>

                  {/* Hover sheen */}
                  <motion.div
                    className="absolute inset-y-0 left-[-30%] w-[30%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-background/35 to-transparent"
                    animate={!isOpen ? { left: ['-35%', '125%'] } : {}}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1.8,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Invitation card */}
                <motion.div
                  initial={{ y: 110, opacity: 0, scale: 0.96 }}
                  animate={
                    isOpen
                      ? { y: -48, opacity: 1, scale: 1 }
                      : { y: 110, opacity: 0, scale: 0.96 }
                  }
                  transition={{
                    duration: 1.1,
                    delay: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-none absolute left-1/2 top-[56px] w-[360px] -translate-x-1/2"
                >
                  <div className="relative overflow-hidden rounded-[24px] border border-secondary/35 bg-[linear-gradient(180deg,rgba(250,246,240,0.98)_0%,rgba(255,255,255,0.99)_100%)] px-8 py-10 shadow-md shadow-foreground/20">
                    {/* Card glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(174,146,93,0.18),transparent_44%)]" />

                    {/* Card frame */}
                    <div className="absolute left-1/2 top-4 h-8 w-8 -translate-x-1/2 rounded-full border border-secondary/50 bg-background/70 text-center text-[10px] leading-8 text-primary">
                      SH
                    </div>

                    {/* Card ornament */}
                    <div className="relative text-center">
                      <div className="space-y-2 mb-3">
                        <p className="text-[9px] uppercase tracking-[0.28em] text-primary">
                          Together with their families
                        </p>
                        <p className="text-[9px] leading-5 text-primary">
                          Bride, the loving daughter of<br />
                          <span className="font-semibold">MRS. A.W.S.K GUNARATHNA</span> (Mother) and <span className="font-semibold">MR. P.A PATHMASIRI</span> (Father)
                        </p>
                        <p className="text-[9px] leading-5 text-primary">
                          Groom, the loving son of<br />
                          <span className="font-semibold">MRS. S.C.P ATTANAYAKE</span> (Mother) and <span className="font-semibold">MR. E.G.S ELAKUMBURA</span> (Father)
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-secondary/45" />
                        <span className="text-primary">❋</span>
                        <span className="h-px w-10 bg-secondary/45" />
                      </div>

                      <h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] text-primary">
                        SACHITH
                      </h2>
                      <p className="mt-1 font-serif text-lg italic text-primary">&</p>
                      <h2 className="font-serif text-4xl font-light tracking-[0.08em] text-primary">
                        HANSIKA
                      </h2>

                      <p className="mx-auto mt-5 max-w-[240px] text-sm leading-7 text-primary">
                        Invite you to witness our traditional Poruwa Ceremony filled with love and joy.
                      </p>

                      <div className="mt-6 flex items-center justify-center gap-3">
                        <span className="h-px w-10 bg-secondary/45" />
                        <span className="text-primary">✦</span>
                        <span className="h-px w-10 bg-secondary/45" />
                      </div>

                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                        September 13, 2026
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.button>

              {/* Instruction moved outside the envelope for better readability on mobile */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={!isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-center text-[11px] uppercase tracking-[0.45em] text-primary/80"
              >
                Touch to Unveil
              </motion.p>
            </motion.div>
          </div>

        </motion.section>
      )}
    </AnimatePresence>
  );
}