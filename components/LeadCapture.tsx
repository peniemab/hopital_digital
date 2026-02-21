"use client";

import { useState } from 'react';
import { databases, ID_UNIQUE, APPWRITE_CONFIG } from '@/lib/appwrite';

export default function LeadCapture() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Traitement en cours...');

    try {
      await databases.createDocument(
        APPWRITE_CONFIG.dbId, 
        APPWRITE_CONFIG.colLeads, 
        ID_UNIQUE.unique(), 
        { email, phone }
      );
      setStatus('✅ Merci ! Vos coordonnées ont été enregistrées.');
      setEmail('');
      setPhone('');
    } catch (error) {
      setStatus('❌ Erreur de connexion. Réessayez plus tard.');
      console.error("Erreur Appwrite:", error);
    }
  };

  return (
    <section className="py-16 bg-blue-50 border-y border-blue-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Horizon Santé 2026 : Gardons le contact</h2>
        <p className="text-gray-600 mb-8">Laissez-nous vos coordonnées pour recevoir les mises à jour de la Clinique Astryd.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
          <input 
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" className="px-4 py-3 text-gray-800 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" required
          />
          <input 
            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone" className="px-4 py-3 text-gray-800 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
            S'inscrire
          </button>
        </form>
        {status && <p className="mt-4 font-medium text-blue-800 animate-pulse">{status}</p>}
      </div>
    </section>
  );
}