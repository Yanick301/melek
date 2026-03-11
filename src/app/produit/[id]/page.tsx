"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

const PRODUCT_DATA: Record<string, any> = {
    '1': { id: '1', name: 'Veste Vintage en Cuir', price: 85000, category: 'Homme Heritage', description: 'Une pièce rare des années 90, en cuir véritable d\'Italie. Sa patine naturelle témoigne d\'un passé noble. Un veston qui transcende les époques.', image_url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504', gallery: ['https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504', 'https://images.unsplash.com/photo-1551028719-00167b16eac5'], sizes: ['M', 'L', 'XL'] },
    '2': { id: '2', name: 'Robe en Soie Italienne', price: 45000, category: 'Femme Elégance', description: 'Fluidité et délicatesse pour cette robe en soie sauvage. Un tombé impeccable qui sublime la silhouette féminine avec une grace infinie.', image_url: 'https://images.unsplash.com/photo-1539109132314-34a936699561', sizes: ['S', 'M'] },
}

export default function ProductPage() {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [selectedSize, setSelectedSize] = useState('')
    const [activeImage, setActiveImage] = useState(0)

    const product = PRODUCT_DATA[id as string]

    if (!product) return <div style={{ textAlign: 'center', padding: '10rem 0', fontStyle: 'italic' }}>Cette pièce s'est évaporée...</div>

    const formatPrice = (p: number) => {
        return new Intl.NumberFormat('fr-BJ', {
            style: 'currency',
            currency: 'XOF',
            maximumFractionDigits: 0
        }).format(p)
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("La distinction exige une taille. Veuillez en choisir une.")
            return
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            size: selectedSize
        })

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#B8860B', '#ffffff', '#000000']
        })
    }

    return (
        <div className="pt-32 pb-40 bg-black overflow-hidden relative">
            <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-accent/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <Link href="/boutique" className="group inline-flex items-center gap-4 mb-16 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
                    <div className="p-2 border border-white/5 group-hover:border-white/20 transition-colors">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Retour au catalogue
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Visuals - Left Spans 7 columns */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="aspect-[4/5] bg-[#050505] overflow-hidden ring-1 ring-white/5 relative group"
                        >
                            <img
                                src={[product.image_url, ...(product.gallery_urls || [])][activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                        </motion.div>

                        <div className="flex gap-6">
                            {[product.image_url, ...(product.gallery_urls || [])].map((img, i) => (
                                <button
                                    key={i}
                                    className={`relative w-24 aspect-[3/4] overflow-hidden transition-all duration-500 ring-1 ${activeImage === i ? 'ring-accent p-1' : 'ring-white/5 opacity-40 hover:opacity-80'}`}
                                    onClick={() => setActiveImage(i)}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content - Right Spans 5 columns */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col pt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-12 h-[1px] bg-accent/40" />
                                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white/95 leading-tight mb-8">
                                {product.name}
                            </h1>

                            <p className="text-3xl md:text-5xl font-serif italic text-accent/90 mb-12 drop-shadow-lg">
                                {formatPrice(product.price)}
                            </p>

                            <div className="prose prose-invert max-w-none text-white/60 leading-relax text-sm md:text-base font-light tracking-wide mb-16 border-l-2 border-accent/20 pl-8 italic">
                                "{product.description}"
                            </div>

                            {/* Sizes */}
                            <div className="mb-16">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/80">Choisir la mesure</h3>
                                    <Link href="/guide-tailles" className="text-[8px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors underline underline-offset-8">Guide d'expertise</Link>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-16 h-16 flex items-center justify-center text-xs font-bold transition-all duration-500 border ${selectedSize === size
                                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                                    : 'bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <button
                                onClick={handleAddToCart}
                                className="group relative w-full py-8 text-[11px] uppercase font-bold tracking-[0.6em] overflow-hidden bg-white text-black hover:text-white transition-colors duration-700 mb-12"
                            >
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                                <span className="relative z-10 flex items-center justify-center gap-6">
                                    <ShoppingBag size={18} strokeWidth={1.5} />
                                    Acquérir cette curation
                                </span>
                            </button>

                            {/* Trust Badges */}
                            <div className="space-y-6 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-6 group">
                                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-accent/10 transition-colors">
                                        <ShieldCheck size={20} className="text-accent" strokeWidth={1} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">Authenticité Certifiée</p>
                                        <p className="text-[8px] uppercase tracking-[0.1em] text-white/30 mt-1">Expertisée par Melek Heritage</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
