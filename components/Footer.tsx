"use client";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-blue-950 text-white pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Colonne 1 : À propos */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Horizon Santé 2026
                    </h3>
                    <p className="text-blue-100/70 font-black text-sm leading-relaxed">
                        Excellence médicale et innovation au service de votre santé. La Clinique Astryd s'engage à fournir des soins de classe mondiale avec des technologies de pointe.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <Facebook className="hover:text-blue-400 cursor-pointer transition-colors" size={20} />
                        <Instagram className="hover:text-pink-400 cursor-pointer transition-colors" size={20} />
                        <Linkedin className="hover:text-blue-300 cursor-pointer transition-colors" size={20} />
                    </div>
                </div>

                {/* Colonne 2 : Navigation */}
                <div>
                    <h4 className="text-lg font-black mb-6 border-b border-blue-900 pb-2">Navigation</h4>
                    <ul className="space-y-4 text-sm text-blue-100/70 font-black">
                        <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors">Accueil</button></li>
                        <li><button onClick={() => scrollToSection('services-section')} className="hover:text-white transition-colors">Nos Services</button></li> 
                        <li><button onClick={() => scrollToSection('doctors-section')} className="hover:text-white transition-colors">Équipe Médicale</button></li>
                        <li><button onClick={() => scrollToSection('appointment-form')} className="hover:text-white transition-colors font-bold text-cyan-400">Je prends mon rendez-vous</button></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-black mb-6 border-b border-blue-900 pb-2">Contact</h4>
                    <ul className="space-y-4 text-sm text-blue-100/70">
                        <li className="flex items-start font-black gap-3">
                            <MapPin size={18} className="text-blue-400 shrink-0" />
                            <span>123 Avenue de la Santé,<br />Gombe, Kinshasa, RDC</span>
                        </li>
                        <li className="flex items-center font-black gap-3">
                            <Phone size={18} className="text-blue-400 shrink-0"/>
                            <span className='tel:243812345678'>+243 812 345 678</span>
                        </li>
                        <li className="flex items-center font-black gap-3">
                            <Mail size={18} className="text-blue-400 shrink-0"/>
                            <span className='mailto:contact@astryd.-sante.com'>contact@astryd-sante.com</span>
                        </li>
                    </ul>
                </div>

                {/* Colonne 4 : Horaires & Visites */}
                <div>
                    <h4 className="text-lg font-black mb-6 border-b border-blue-900 pb-2">Horaires</h4>
                    <div className="space-y-6 text-sm text-blue-100/70">
                        {/* Consultations */}
                        <div>
                            <p className="text-blue-400 font-black uppercase text-[10px] tracking-widest mb-2 flex items-center gap-1">
                                <Clock size={12} /> Consultations
                            </p>
                            <ul className="space-y-1">
                                <li className="flex font-black justify-between"><span>Lundi - Vendredi</span> <span className="text-white">08h - 20h</span></li>
                                <li className="flex font-black justify-between"><span>Samedi</span> <span className="text-white">09h - 16h</span></li>
                            </ul>
                        </div>

                        {/* Visites */}
                        <div>
                            <p className="text-cyan-400 font-black uppercase text-[10px] tracking-widest mb-2 flex items-center gap-1">
                                <Clock size={12} /> horaires de visite
                            </p>
                            <ul className="space-y-1">
                                <li className="flex font-black justify-between"><span>Matin</span> <span className="text-white">11h - 13h</span></li>
                                <li className="flex font-black justify-between"><span>Soir</span> <span className="text-white">16h - 19h</span></li>
                            </ul>
                        </div>

                        {/* Urgences */}
                        <div className="pt-2">
                            <div className="flex items-center gap-2 text-red-400 font-black italic">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                URGENCES 24h/7
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-6xl mx-auto font-black px-4 mt-16 pt-8 border-t border-blue-900 text-center text-xs text-blue-200/50">
                <p>&copy; {currentYear} Horizon Santé 2026 - Clinique Astryd. Tous droits réservés.</p>
            </div>
        </footer>
    );
}