"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Slow Zoom */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="/hero-v2.png"
                    alt="Melek Luxury"
                    className="w-full h-full object-cover opacity-80"
                />
            </motion.div>

            <div className="container relative z-20 px-6 lg:px-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="inline-block text-[10px] md:text-xs uppercase tracking-[0.6em] text-accent font-bold mb-6"
                        >
                            Melek Clothing — Heritage 2026
                        </motion.span>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.85] mb-8 text-white"
                        >
                            L'Élégance <br />
                            <span className="italic text-accent ml-4 md:ml-12 drop-shadow-2xl">Souveraine</span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-sm md:text-base text-muted max-w-lg mb-12 font-light leading-relaxed tracking-wide"
                        >
                            Une curation prestigieuse de pièces d'exception, méticuleusement sélectionnées pour l'élite du style contemporain.
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <Link href="/boutique" className="group relative overflow-hidden bg-white text-black px-10 py-5 text-[10px] uppercase font-bold tracking-[0.3em] transition-colors hover:bg-accent hover:text-white">
                                <span className="relative z-10 text-center block">Explorer la collection</span>
                            </Link>
                            <Link href="/boutique?cat=Nouveautés" className="border border-white/20 px-10 py-5 text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:bg-white/10 transition-colors text-center">
                                Nouveautés
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[8px] uppercase tracking-[0.8em] text-muted opacity-50">Découvrir l'univers</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
        </div>
    )
}
