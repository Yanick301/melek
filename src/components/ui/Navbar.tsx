"use client"

import Link from 'next/link'
import Logo from './Logo'
import { ShoppingBag, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import CartSheet from '../cart/CartSheet'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { totalItems } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsScrolled(currentScrollY > 50)

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const navLinks = [
        { name: 'Collections', href: '/boutique' },
        { name: 'Homme', href: '/boutique?cat=Homme' },
        { name: 'Femme', href: '/boutique?cat=Femme' },
        { name: 'Héritage', href: '/' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                    ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5'
                    : 'py-8 bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
                    <Link href="/">
                        <Logo />
                    </Link>

                    <ul className="nav-links hidden lg:flex">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-accent transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-6 items-center">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative group"
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute', top: '-5px', right: '-5px',
                                    background: 'var(--accent)', fontSize: '0.5rem',
                                    width: '12px', height: '12px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            className="lg:hidden text-white"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={20} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.98)',
                            zIndex: 200, display: 'flex', flexDirection: 'column',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X size={32} strokeWidth={1} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 items-center justify-center flex-1">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{
                                            fontSize: '1.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.3em',
                                            fontFamily: 'Bodoni Moda',
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 'auto', opacity: 0.5 }}>
                            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                                Melek Clothing • Heritage 2026
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
