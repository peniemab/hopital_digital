"use client";

import { useState } from 'react';
import { databases, ID_UNIQUE, APPWRITE_CONFIG } from '@/lib/appwrite';
import { ArrowRight, Sparkles } from 'lucide-react'; // Ajout d'icônes pro

export default function LeadCapture() {
  const [isAppointmentMode, setIsAppointmentMode] = useState(false);
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    gender: '',
    birthdate: '', 
    commune: '',
    quartier: '',
    avenue: '',
    service_id: '',
    reason: '',
    appointment_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Traitement en cours...');

    try {
      if (isAppointmentMode) {
        await databases.createDocument(
          APPWRITE_CONFIG.dbId,
          APPWRITE_CONFIG.colAppointments, 
          ID_UNIQUE.unique(),
          {
            patient_name: formData.fullname,
            patient_phone: formData.phone,
            gender: formData.gender,
            birthdate: formData.birthdate,
            commune: formData.commune,
            quartier: formData.quartier,
            address: formData.avenue,
            service_id: formData.service_id,
            reason: formData.reason,
            appointment_date: formData.appointment_date,
            status: 'pending'
          }
        );
        setStatus("Pour toute annulation, merci de prévenir 24h à l'avance au +243 123 456 789. Merci ! Un conseiller vous contactera bientôt pour confirmer votre rendez-vous.");
      } else {
        await databases.createDocument(
          APPWRITE_CONFIG.dbId,
          APPWRITE_CONFIG.colLeads,
          ID_UNIQUE.unique(),
          { 
            email: formData.email,
            phone: formData.phone,
          }
        );
        setStatus("Merci ! Votre inscription est confirmée.");
      }
      setFormData({ fullname: '', phone: '', email: '', gender: '', birthdate: '', commune: '', quartier: '', avenue: '', service_id: '', appointment_date: '', reason: '' });
    } catch (error: any) {
      setStatus(`Erreur : ${error.message}`);
    }
  };

  return (
    // LE FRAGMENT <> RESOUT L'ERREUR JSX
    <>
      <section id="appointment-form" className="py-24 bg-white border-y border-blue-600/20">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold mb-4 uppercase tracking-tighter">
 <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            <p> Prise en charge disponible sous 5 min </p>
              </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Inscrivez-vous à notre newsletter santé</h2>

          <p className="text-slate-500 text-xl">Prendre mon rendez-vous en ligne</p>

            {/* <h2 className="text-4xl font-black text-blue-950 mb-3 tracking-tight uppercase">
              {isAppointmentMode ? "Finalisez votre admission" : "Maîtrisez votre santé"}
            </h2> */}
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 bg-white p-3 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" placeholder="Noms" required
                className="p-4 rounded-2xl border-blue-600/20 border outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50/50"
                value={formData.fullname} onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              />
              <input 
                type="email" placeholder="votre@email.com" required
                className="p-4 rounded-2xl border-blue-600/20 border outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50/50"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" placeholder="+243..." required
                className="p-4 rounded-2xl border-blue-600/20 border outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50/50"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="flex justify-center py-4">
              <button 
                type="button" 
                onClick={() => setIsAppointmentMode(!isAppointmentMode)}
                className={`
                  group relative flex items-center gap-3 py-3 px-8
                  rounded-full font-bold transition-all duration-300 transform active:scale-95
                  ${isAppointmentMode 
                    ? "bg-red-200 text-slate-800" 
                    : "bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700"
                  }
                `}
              >
                {!isAppointmentMode && <Sparkles size={18} className="animate-pulse" />}
                <span className="text-sm uppercase tracking-widest">
                  {isAppointmentMode ? "Fermer" : "Prendre un rendez-vous"}
                </span>
                {/* <ArrowRight size={18} className={`transition-transform ${isAppointmentMode ? 'rotate-90' : 'group-hover:translate-x-1'}`} /> */}
              </button>
            </div>

            {isAppointmentMode && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-6 duration-700 bg-white ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select 
                    className="p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200"
                    value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Sexe</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                  <input 
                    type="text" placeholder="Date de naissance (JJ/MM/AA)"
                    className="p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200"
                    value={formData.birthdate} onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                  />
                  <input 
                    type="text" placeholder="Commune"
                    className="p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200"
                    value={formData.commune} onChange={(e) => setFormData({...formData, commune: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Quartier" className="p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200" value={formData.quartier} onChange={(e) => setFormData({...formData, quartier: e.target.value})} />
                  <input type="text" placeholder="Avenue et numero" className="p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200" value={formData.avenue} onChange={(e) => setFormData({...formData, avenue: e.target.value})} />
                </div>

                <div className="space-y-4">
                  <select required={isAppointmentMode} className="w-full p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200" value={formData.service_id} onChange={(e) => setFormData({...formData, service_id: e.target.value})}>
                    <option value="">Choisir un service</option>
                    <option value="cardiologie">Cardiologie Interventionnelle</option>
                    <option value="pediatrie">Néonatologie & Pédiatrie</option>
                    <option value="chirurgie">Chirurgie de Pointe</option>
                  </select>
                  <textarea placeholder="Décrivez brièvement le motif..." className="w-full p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} rows={2} />
                  <input type="datetime-local" required={isAppointmentMode} className="w-full p-4 rounded-2xl border-blue-600/20 border bg-slate-50/50 outline-none focus:ring-2 focus:ring-blue-200" value={formData.appointment_date} onChange={(e) => setFormData({...formData, appointment_date: e.target.value})} />
                </div>
              </div>
            )}

            <button type="submit" className="w-full mt-2 bg-green-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest text-sm">
              {isAppointmentMode ? 'Je prends rendez-vous' : 'Je m\'inscris'}
            </button>

            {status && <p className="text-center p-4 bg-blue-50 rounded-2xl font-bold text-blue-900 animate-pulse">{status}</p>}
          </form>
        </div>
      </section>

      {/* BANNIÈRE DE PRESTIGE (Indétrônable) */}
      <div className="bg-white border-b border-blue-600/20 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <div>
              <p className="text-blue-950 font-black text-xl tracking-tight leading-none">4.9/5</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Satisfaction certifiée</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center text-[10px] md:text-xs font-black text-slate-300 uppercase tracking-[0.3em]">
            <span className="hover:text-blue-600 transition-colors">OMS CERTIFIED</span>
            <span className="hover:text-blue-600 transition-colors">CNSS RDC</span>
            <span className="hover:text-blue-600 transition-colors">AIG INSURANCE</span>
            <span className="hover:text-blue-600 transition-colors">ASCOMA GROUP</span>
          </div>
        </div>
      </div>
    </>
  );
}