"use client";
import { useEffect, useState } from 'react';
import { databases, APPWRITE_CONFIG } from '@/lib/appwrite';
import { 
  Stethoscope, Heart, Baby, Activity, 
  Syringe, FlaskConical, Eye, Smile, 
  Bone, Brain, ClipboardList, Thermometer 
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  stethoscope: Stethoscope,
  heart: Heart,
  baby: Baby,
  activity: Activity,
  syringe: Syringe,
  microbe: FlaskConical,   
  eye: Eye,
  tooth: Smile,      
  bones: Bone,       
  brain: Brain,
  lab: ClipboardList,
  emergency: Thermometer
};

// DICTIONNAIRE D'IMAGES (Nouveau pour le visuel)
const imageMap: { [key: string]: string } = {
    stethoscope: "https://i.pinimg.com/736x/b3/a7/3e/b3a73eefee55a12c044757818a574a26.jpg", //radiologieok
    activity:  "https://i.pinimg.com/1200x/58/6d/d5/586dd5a3fc9fb7806e545bdb0ff86846.jpg",    //medecine interne et chirurgieok 
    baby: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800", //maternite et pediatrieok
    bones:  "https://i.pinimg.com/1200x/2c/b3/d2/2cb3d2c006c900480f4b8f456171413e.jpg",     //orthopedieok
    lab: "https://i.pinimg.com/736x/5b/cf/ae/5bcfae0ad99fd6324c5e1742d252ac2d.jpg",        // Laboratoireok
    heart: "https://i.pinimg.com/736x/f8/73/d4/f873d49faf72d02c82e4055416046581.jpg",      // Cardiologieok
    eye: "https://i.pinimg.com/1200x/75/b4/f5/75b4f53dd8c644a0863576787c170201.jpg",        // Ophtalmologieok
    tooth: "https://i.pinimg.com/736x/f2/b4/ee/f2b4ee73433f1c8fa8899af76a3a239c.jpg",      // Dentisterieok
    brain: "https://i.pinimg.com/1200x/e1/e2/9c/e1e29c5bfca41cadcba02f5119651e59.jpg",     // Neurologieok
    emergency: "https://i.pinimg.com/736x/f9/00/4a/f9004a1acc449ebb8b60dcf2f548b509.jpg",  // Urgenceok
};

interface MedicalService {
    name: string;
    description: string;
    is_emergency: boolean;
    icon: string;
}

export default function Services() {
    const [services, setServices] = useState<MedicalService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await databases.listDocuments(
                    APPWRITE_CONFIG.dbId,
                    APPWRITE_CONFIG.colServices
                );
                setServices(response.documents as any);
            } catch (error) {
                console.error("Erreur services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div className="py-20 text-center text-blue-900">Chargement des services...</div>;

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-blue-950 mb-4 tracking-tight">Nos Spécialités Médicales</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Une expertise de pointe alliée à un plateau technique moderne pour votre santé.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon?.toLowerCase()] || Stethoscope;
                        const serviceImage = imageMap[service.icon?.toLowerCase()] || imageMap.stethoscope;
                        
                        return (
                            <div key={index} 
                                className="group relative h-[400px] overflow-hidden rounded-3xl cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                            >
                                {/* IMAGE DE FOND */}
                                <div 
                                    className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url('${serviceImage}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />

                                {/* OVERLAY DÉGRADÉ (Pour la lisibilité) */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* CONTENU TEXTE */}
                                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                                        service.is_emergency ? 'bg-red-500 text-white' : 'bg-white/20 backdrop-blur-md text-white group-hover:bg-blue-500'
                                    }`}>
                                        <IconComponent size={24} />
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {service.name}
                                    </h3>
                                    
                                    {/* Description qui apparaît au survol */}
                                    <p className="text-blue-100 text-sm opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 overflow-hidden leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.is_emergency && (
                                        <div className="mt-4 flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-widest">
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                            Disponibilité 24h/7
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}