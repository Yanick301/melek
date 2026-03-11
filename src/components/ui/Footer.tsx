import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-20 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <Logo />
                        <p className="text-xs uppercase tracking-widest text-muted max-w-xs leading-loose">
                            Curation de prestige à Cotonou. L'héritage du style, la durabilité du luxe.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Navigation</h4>
                        <ul className="flex flex-col gap-4 text-xs uppercase tracking-widest text-muted">
                            <li><Link href="/boutique" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/boutique?cat=Homme" className="hover:text-white transition-colors">Homme</Link></li>
                            <li><Link href="/boutique?cat=Femme" className="hover:text-white transition-colors">Femme</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Contact</h4>
                        <ul className="flex flex-col gap-4 text-xs uppercase tracking-widest text-muted">
                            <li><span className="opacity-50">Localisation:</span> Cotonou, Bénin</li>
                            <li><span className="opacity-50">Livraison:</span> Partout au Bénin</li>
                            <li><Link href="https://wa.me/xxx" className="text-white hover:text-accent transition-colors">WhatsApp Business</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted opacity-50 font-medium">
                        © {currentYear} Melek Clothing — Tous droits réservés. Design by Prestige.
                    </p>
                </div>
            </div>
        </footer>
    )
}
