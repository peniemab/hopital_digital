"use client";

import { useState } from 'react';
import { databases, ID_UNIQUE, APPWRITE_CONFIG } from '@/lib/appwrite';

export default function LeadCapture() {
  // Mode du formulaire : simple (leads) ou complet (appointments)
  const [isAppointmentMode, setIsAppointmentMode] = useState(false);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  // Champs communs et spécifiques (tes photos)
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
        // ENVOI VERS APPOINTMENTS
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
        // ENVOI VERS LEADS (Capture simple)
        await databases.createDocument(
          APPWRITE_CONFIG.dbId,
          APPWRITE_CONFIG.colLeads,
          ID_UNIQUE.unique(),
          { 
            email: formData.email,
            phone: formData.phone,
          }
        );
        setStatus("Merci ! Un conseiller vous contactera bientôt.");
      }
      
      // Reset après succès
      setFormData({ fullname: '', phone: '', email: '', gender: '', birthdate: '', commune: '', quartier: '', avenue: '', service_id: '', appointment_date: '', reason: '' });
    } catch (error: any) {
      setStatus(`Erreur : ${error.message}`);
    }
  };

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Inscrivez-vous à notre newsletter santé</h2>
          <p className="text-slate-500">Prendre mon rendez-vous en ligne</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" placeholder="Noms:" required
              className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.fullname} onChange={(e) => setFormData({...formData, fullname: e.target.value})}
            />
            <input 
              type="email" placeholder="Email:exemple@gmail.com" required
              className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="tel" placeholder="Téléphone : 243xxxxxxxx" required
              className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="button" 
              onClick={() => setIsAppointmentMode(!isAppointmentMode)}
              className="text-sm text-blue-800 font-semibold underline"
            >
              {isAppointmentMode ? "Fermer" : "Consulter un expert maintenant, Je prends soin de ma santé."}
            </button>
          </div>

          {/* SECTION DÉTAILLÉE (Hybride) */}
          {isAppointmentMode && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select 
                  className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 border outline-none"
                  value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Sexe</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                <input 
                  type="text" placeholder="Date de naissance (JJ/MM/AA)"
                  className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.birthdate} onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                />
                <input 
                  type="text" placeholder="Commune : kinshasa,nsele,..."
                  className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.commune} onChange={(e) => setFormData({...formData, commune: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="Quartier"
                  className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.quartier} onChange={(e) => setFormData({...formData, quartier: e.target.value})}
                />
                <input 
                  type="text" placeholder="Avenue et Numéro"
                  className="p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.avenue} onChange={(e) => setFormData({...formData, avenue: e.target.value})}
                />
              </div>

              <div className="p-4 bg-blue-100 rounded-2xl">
<div className="space-y-2 mb-4">
  <select 
    required={isAppointmentMode}
    className="w-full p-3 rounded-xl border outline-none bg-white focus:ring-2 focus:ring-blue-200"
    value={formData.service_id} 
    onChange={(e) => setFormData({...formData, service_id: e.target.value})}
  >
    <option value="">Choisir un service</option>
    {/* Idéalement, ici on bouclera sur tes services Appwrite plus tard */}
    <option value="cardiologie">Cardiologie</option>
    <option value="dentisterie">Dentisterie</option>
    <option value="pediatrie">Pédiatrie</option>
    <option value="gynecologie">Gynécologie</option>
    <option value="generaliste">Médecine Générale</option>
  </select>
</div>
<textarea 
      placeholder="Motif de la consultation (Ex: Fièvre, Douleur, Contrôle...)"
      className="w-full p-3 rounded-xl border outline-none bg-white focus:ring-2 focus:ring-blue-200"
      value={formData.reason} 
      onChange={(e) => setFormData({...formData, reason: e.target.value})}
      rows={3}
    />
                <p className="text-xs font-black text-blue-800 uppercase mb-3 ml-1 tracking-widest">
    Sélectionner la Date & Heure
  </p>
  <input 
    type="datetime-local" 
    required={isAppointmentMode}
    className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-inner"
    value={formData.appointment_date} 
    onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
  />
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition">
            {isAppointmentMode ? 'Confirmer le Rendez-vous' : 'Être rappelé par un conseiller'}
          </button>

          {status && <p className="text-center font-medium text-blue-900">{status}</p>}
        </form>
      </div>
    </section>
  );
}