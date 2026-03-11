"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/lib/data/products'

export default function FeaturedProducts() {
    // Empty state for products as requested by user
    const products = []

    return (
        <section style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                            Curations de Saison
                        </h2>
                        <h3 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                            Les Pièces <span className="serif-italic">Iconiques</span>
                        </h3>
                    </motion.div>
                </div>

                {MOCK_PRODUCTS.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
                        {MOCK_PRODUCTS.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 1.2,
                                    delay: idx * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className="group relative"
                            >
                                <Link href={`/produit/${product.id}`} className="block">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A] mb-8">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />

                                        {/* Luxury Highlight Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Exclusive Badge */}
                                        {product.is_featured && (
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="bg-accent/90 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 shadow-2xl">
                                                    Exclusif
                                                </span>
                                            </div>
                                        )}

                                        {/* Action Button Reveal */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            <span className="border border-white/40 bg-white/10 backdrop-blur-xl text-white text-[9px] uppercase tracking-[0.4em] px-8 py-4 font-bold">
                                                Détails de l'article
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-center transition-transform duration-500 group-hover:-translate-y-2">
                                        <span className="text-[9px] uppercase tracking-[0.5em] text-accent/60 mb-3 block font-bold transition-colors group-hover:text-accent">
                                            {product.category}
                                        </span >
                                        <h4 className="text-xs uppercase tracking-[0.2em] font-light mb-3 text-white/90 group-hover:text-white">
                                            {product.name}
                                        </h4>
                                        <div className="w-8 h-[1px] bg-white/10 mx-auto mb-3 transition-all duration-700 group-hover:w-20 group-hover:bg-accent/40" />
                                        <p className="font-serif italic text-sm text-white/50 group-hover:text-white transition-colors">
                                            {new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(product.price)}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        padding: '10rem 2rem', border: '1px solid var(--border)',
                        textAlign: 'center', background: 'rgba(255,255,255,0.02)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            style={{ zIndex: 10, position: 'relative' }}
                        >
                            <p style={{ fontSize: '1.5rem', fontFamily: 'Bodoni Moda', fontStyle: 'italic', marginBottom: '2rem', opacity: 0.8 }}>
                                "Le luxe est une affaire de patience et de choix."
                            </p>
                            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5, maxWidth: '500px', margin: '0 auto' }}>
                                Nos prochaines sélections sont en cours d'expertise. <br />
                                L'excellence ne se précipite pas.
                            </p>
                        </motion.div>

                        {/* Background Texture for Empty State */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundImage: 'radial-gradient(circle at center, rgba(184, 134, 11, 0.05) 0%, transparent 70%)',
                            zIndex: 1
                        }}></div>
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <Link href="/boutique" className="btn-outline" style={{ padding: '1.2rem 3rem' }}>
                        Consulter la Curathèque
                    </Link>
                </div>
            </div>
        </section>
    )
}
