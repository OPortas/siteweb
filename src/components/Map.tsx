import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Navigation } from 'lucide-react';

export function Map() {
  const { language } = useLanguage();
  const address = 'R. dos Correeiros 64, 1100-161 Lisboa, Portugal';
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="relative bg-white" id="location">
      {/* Map Info Overlay */}
      <div className="absolute top-0 left-0 w-full bg-white py-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px w-12 bg-primary"></div>
            <h2 className="text-3xl md:text-4xl font-serif text-center mx-6">
              {language === 'en' ? 'Find Us' : 'Localização'}
            </h2>
            <div className="h-px w-12 bg-primary"></div>
          </div>
        </div>
      </div>

      {/* Full Width Map Container */}
      <div className="h-[600px] w-full relative">
        {/* Info Box Overlay */}
        <div className="absolute top-32 left-4 md:left-12 z-20 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md">
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'en' ? 'Address' : 'Morada'}
                </h3>
                <p className="text-gray-600">
                  R. dos Correeiros 64<br />
                  1100-161 Lisboa<br />
                  Portugal
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary-400 transition-colors"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Get Directions' : 'Como Chegar'}
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {language === 'en' ? 'How to get here' : 'Como chegar'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Metro: Baixa-Chiado (Blue and Green lines)'
                  : 'Metro: Baixa-Chiado (Linhas Azul e Verde)'}
              </p>
              <p className="text-gray-600">
                {language === 'en'
                  ? 'Tram: 15E, 25E (Praça do Comércio stop)'
                  : 'Elétrico: 15E, 25E (Paragem Praça do Comércio)'}
              </p>
            </div>
          </div>
        </div>

        {/* Full Width Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5754371395424!2d-9.139748!3d38.711461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347f3b1f25cf%3A0x48d7561aef3b4e7!2sR.%20dos%20Correeiros%2064%2C%201100-161%20Lisboa%2C%20Portugal!5e0!3m2!1sen!2s!4v1624451234567!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={language === 'en' ? 'Restaurant location' : 'Localização do restaurante'}
          className="absolute inset-0"
        />
      </div>
    </section>
  );
}