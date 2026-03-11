"use client"

import { useCart } from '@/context/CartContext'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateWhatsAppLink } from '@/lib/whatsapp'

export default function CartSheet({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { items, removeFromCart, totalPrice, totalItems } = useCart()

    const formatPrice = (p: number) => {
        return new Intl.NumberFormat('fr-BJ', {
            style: 'currency',
            currency: 'XOF',
            maximumFractionDigits: 0
        }).format(p)
    }

    const handleCheckout = () => {
        if (items.length === 0) return
        const whatsappUrl = generateWhatsAppLink(items, totalPrice)
        window.open(whatsappUrl, '_blank')
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 110, backdropFilter: 'blur(5px)' }}
                    />

                    <motion.div
                        initial={{ x: '100%', opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md md:max-w-lg bg-black/40 backdrop-blur-3xl z-[120] flex flex-col border-l border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                    >
                        {/* Cart Header */}
                        <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="p-3 bg-white/5 rounded-full">
                                    <ShoppingBag size={24} className="text-accent" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/90">
                                        Votre Sélection
                                    </h2>
                                    <p className="text-[8px] uppercase tracking-[0.2em] text-accent mt-1">
                                        {totalItems} Article{totalItems > 1 ? 's' : ''} d'exception
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="group relative p-2 overflow-hidden rounded-full hover:bg-white/5 transition-colors"
                            >
                                <X size={24} className="text-white/40 group-hover:text-white transition-colors rotate-90 group-hover:rotate-0 duration-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 group">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ShoppingBag size={80} strokeWidth={0.5} className="mb-8" />
                                    </motion.div>
                                    <p className="text-[10px] uppercase tracking-[0.5em] font-light">L'écrin est vide</p>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            key={`${item.id}-${item.size}`}
                                            className="flex gap-8 group"
                                        >
                                            <div className="w-24 aspect-[3/4] bg-[#0A0A0A] overflow-hidden flex-shrink-0 relative">
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                                            </div>
                                            <div className="flex-1 flex flex-col py-1">
                                                <div className="mb-auto">
                                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90 mb-2 truncate">{item.name}</h4>
                                                    <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-accent">
                                                        Taille {item.size} • Qté {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <p className="text-lg font-serif italic text-white/80">{formatPrice(item.price * item.quantity)}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.size)}
                                                        className="text-[9px] uppercase tracking-[0.2em] text-white/30 hover:text-red-400 font-bold transition-all border-b border-transparent hover:border-red-400/30 pb-1"
                                                    >
                                                        Retirer
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-8 md:p-12 bg-white/[0.02] backdrop-blur-3xl border-t border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
                                <div className="flex justify-between items-center mb-8 relative z-10">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Total Estimation</span>
                                    <span className="text-3xl font-serif italic text-accent drop-shadow-[0_0_15px_rgba(184,134,11,0.2)]">{formatPrice(totalPrice)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="relative group w-full py-8 text-[10px] uppercase font-bold tracking-[0.5em] overflow-hidden bg-white text-black hover:text-white transition-colors duration-500"
                                >
                                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        Acquérir via WhatsApp
                                        <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full animate-pulse transition-colors" />
                                    </span>
                                </button>
                                <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 text-center mt-6">
                                    Authenticité héritage garantie Melek
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
