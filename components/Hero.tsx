export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* L'IMAGE DE FOND (Ajoutée ici) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Le dégradé qui remplace ton ancien bg-gradient pour garder la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80"></div>
      </div>

      {/* TON CODE EXISTANT (Intouché, juste passé en z-10) */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <span className="uppercase tracking-widest text-blue-200 text-sm font-semibold">Projet Horizon Santé 2026</span>
        <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight">
          La Clinique Astryd, <br />
          <span className="text-blue-300">Entièrement Digitalisée</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Accédez à nos 12 services médicaux, prenez rendez-vous en ligne et suivez votre dossier médical en toute sécurité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300">
            Prendre Rendez-vous
          </button>
          <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-900 transition duration-300">
            Nos Services
          </button>
        </div>
      </div>
    </section>
  );
}