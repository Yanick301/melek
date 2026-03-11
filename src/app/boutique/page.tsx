"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/data/products'
import Link from 'next/link'

export default function BoutiquePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Tous')

    const categories = ['Tous', 'Homme', 'Femme']

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [searchQuery, selectedCategory])

    return (
        <div className="pt-32 pb-32 min-h-screen bg-black">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Editorial Header */}
                <header className="mb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-7xl md:text-9xl font-serif text-white/95 leading-tight mb-8">
                            La <span className="italic text-accent">Curathèque</span>
                        </h1>
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-[1px] bg-accent/40" />
                            <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
                                Archives & Collections • Heritage 2026
                            </p>
                        </div>
                    </motion.div>
                </header>

                {/* Refined Navigation & Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-24 pb-12 border-b border-white/5 relative z-10">
                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className="group relative py-2"
                            >
                                <span className={`text-[10px] uppercase tracking-[0.4em] transition-all duration-500 ${selectedCategory === cat ? 'text-white font-bold' : 'text-white/30 group-hover:text-white'}`}>
                                    {cat}
                                </span>
                                {selectedCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-12 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-80 group">
                            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" strokeWidth={1.5} />
                            <input
                                type="text"
                                placeholder="Rechercher une pièce..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none pl-10 text-[11px] uppercase tracking-[0.2em] text-white outline-none w-full placeholder:text-white/10"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 group-focus-within:bg-accent/40 transition-colors" />
                        </div>

                        <button className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group">
                            <SlidersHorizontal size={16} strokeWidth={1.5} />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Filtres</span>
                        </button>
                    </div>
                </div>

                {/* Enhanced Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product, idx) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.8,
                                    delay: idx % 4 * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="group"
                            >
                                <Link href={`/produit/${product.id}`} className="block">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#050505] mb-8 ring-1 ring-white/5 transition-all duration-700 group-hover:ring-accent/20">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-80" />

                                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <span className="w-full inline-block text-center py-4 bg-white/5 backdrop-blur-2xl border border-white/10 text-white text-[9px] uppercase tracking-[0.4em] font-bold">
                                                Voir la curation
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center px-4">
                                        <div className="flex items-center justify-center gap-3 mb-3">
                                            <span className="text-[8px] uppercase tracking-[0.4em] text-accent/60 font-bold whitespace-nowrap">
                                                {product.category}
                                            </span>
                                        </div>
                                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-light text-white/90 group-hover:text-white mb-3 line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <p className="font-serif italic text-lg text-white/40 group-hover:text-accent transition-colors">
                                            {new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(product.price)}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center"
                    >
                        <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 italic">
                            Aucun trésor ne correspond à votre recherche.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
