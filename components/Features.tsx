"use client";
import { ShieldCheck, Users, Microscope, ArrowRight, Info } from 'lucide-react';

const doctors = [
    { name: "Dr. Aris Astryd", role: "Chirurgien Chef", details: "Expert en chirurgie robotique assistée, 15 ans d'expérience.", img: "https://i.pinimg.com/736x/8a/0a/61/8a0a6184877e89139268670b306b38ca.jpg" },
    { name: "Dr. Sarah Lukusa", role: "Cardiologie", details: "Spécialiste en cardiologie interventionnelle et rythmostimulation.", img: "https://i.pinimg.com/736x/21/61/92/21619277f9e8a89f9252033c41530931.jpg" },
    { name: "Dr. Marc Kabila", role: "Neurologie", details: "Expertise en neuro-imagerie et traitement des pathologies complexes.", img: "https://i.pinimg.com/736x/06/6c/42/066c42969b7e7135061405e60802c67b.jpg" },
    { name: "Dr. Elena Mwamba", role: "Pédiatrie", details: "Spécialisée en néonatologie et soins pédiatriques intensifs.", img: "https://i.pinimg.com/736x/43/63/0e/43630e6988f583f707f15b3c3c723707.jpg" },
    { name: "Dr. Jean Chen", role: "Radiologie", details: "Expert en diagnostic par IA et imagerie par résonance magnétique.", img: "https://i.pinimg.com/736x/24/85/3e/24853e34b22e1d00f72390f75727e4e1.jpg" },
];

const equipments = [
    { name: "IRM Tesla 3.0", service: "Radiologie", info: "Imagerie haute définition avec reconstruction 3D en temps réel.", img: "https://i.pinimg.com/736x/b3/a7/3e/b3a73eefee55a12c044757818a574a26.jpg" },
    { name: "Robot Chirurgical", service: "Chirurgie", info: "Précision millimétrique pour des interventions mini-invasives.", img: "https://i.pinimg.com/736x/12/42/15/1242157d82e26a3705d4546a8800abcd.jpg" },
    { name: "Analyseur Bio", service: "Laboratoire", info: "Analyses biochimiques automatisées avec résultats en 15 minutes.", img: "https://i.pinimg.com/736x/5bcfae0ad99fd6324c5e1742d252ac2d.jpg" },
    { name: "Scanner Laser", service: "Ophtalmologie", info: "Cartographie complète de la rétine pour une chirurgie laser guidée.", img: "https://i.pinimg.com/1200x/75/b4/f5/75b4f53dd8c644a0863576787c170201.jpg" },
    { name: "Monitorage Avancé", service: "Urgences", info: "Surveillance multiparamétrique connectée au centre de contrôle.", img: "https://i.pinimg.com/736x/f9/00/4a/f9004a1acc449ebb8b60dcf2f548b509.jpg" },
];

export default function Features() {
    return (
        <section className="py-24 bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* 1. SECTION MÉDECINS AVEC PAUSE ET SWIPE */}
                <div className="mb-24 group-container">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-5xl font-black text-blue-950 tracking-tighter mb-4 uppercase">
                            NOS EXPERTS <span className="text-blue-600">RECONNUS</span>
                        </h2>
                        <p className="text-slate-500 text-lg">Défilement automatique ou <b>glissez manuellement</b> pour explorer.</p>
                    </div>

                    <div className="swipe-container hide-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing">
                        <div className="flex animate-infinite-scroll gap-6 w-max">
                            {[...doctors, ...doctors, ...doctors].map((doc, i) => (
                                <div key={i} className="flex-none w-[300px] md:w-[380px] group px-2">
                                    <div className="relative h-[480px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                                        <img src={doc.img} alt={doc.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent opacity-90 group-hover:via-blue-950/60 transition-all"></div>
                                        
                                        <div className="absolute bottom-0 left-0 p-10 w-full transform transition-transform duration-500">
                                            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{doc.role}</p>
                                            <h4 className="text-2xl font-bold text-white mb-4">{doc.name}</h4>
                                            <p className="text-white/0 group-hover:text-white/80 text-sm leading-relaxed transition-all duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
                                                {doc.details}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. SECTION TECHNOLOGIES AVEC PAUSE ET SWIPE */}
                <div className="mb-24 group-container">
                    <div className="max-w-2xl mb-12">
                        <h2 className="text-5xl font-black text-blue-950 tracking-tighter mb-4 uppercase">
                            PLATEAU <span className="text-cyan-500">TECHNIQUE</span>
                        </h2>
                    

                        <p className="text-slate-500 text-lg">Le futur de la médecine 2026 sous votre contrôle.</p>
                    </div>

                    <div className="swipe-container hide-scrollbar overflow-x-auto cursor-grab active:cursor-grabbing">
                        <div className="flex animate-infinite-scroll-reverse gap-6 w-max">
                            {[...equipments, ...equipments, ...equipments].map((item, i) => (
                                <div key={i} className="flex-none w-[350px] md:w-[450px] group px-2">
                                    <div className="relative h-[300px] rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-500 group-hover:scale-[1.02]">
                                        <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-blue-950/60 group-hover:bg-blue-950/80 transition-colors"></div>
                                        
                                        <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Info size={24} />
                                            </div>
                                            <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{item.name}</h4>
                                            <p className="text-cyan-400 text-xs font-bold mb-4 uppercase tracking-widest">{item.service}</p>
                                            <p className="text-white/0 group-hover:text-white/70 text-sm transition-all duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                                                {item.info}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. FOOTER DE SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100 flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <ShieldCheck size={40} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-1 uppercase tracking-tight">Data Security</h3>
                            <p className="text-slate-500 text-sm">Protection blockchain de vos dossiers.</p>
                        </div>
                    </div>

                    <div className="p-10 bg-blue-950 rounded-[3rem] shadow-2xl flex items-center justify-between text-white group cursor-pointer">
                        <div>
                            <h3 className="text-2xl font-bold mb-1 uppercase">Prendre RDV</h3>
                            <p className="text-blue-300 text-sm italic">Accès prioritaire Horizon Santé</p>
                        </div>
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-all transform group-hover:rotate-[-45deg]">
                            <ArrowRight size={28} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}